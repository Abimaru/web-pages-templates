// Orquestador con watchdog (§15). Ejecuta un script npm en cada proyecto,
// imprime avance cada 30 s, aplica timeout y entrega un resumen.
//
//   node scripts/run-all.mjs <script>     (lint | test | build)
//
// Para build, define la base de GitHub Pages por proyecto vía env (sin pasar por
// el shell, así se evita el mangling de rutas de Git Bash en Windows).

import { spawn } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const PROJECTS = [
  { dir: "videojuegos-pixelvault", path: "pixelvault", stack: "next" },
  { dir: "computacion-nexora", path: "nexora", stack: "next" },
  { dir: "muebles-atelier-ibarguen", path: "muebles", stack: "vite" },
  { dir: "ropa-maru", path: "maru", stack: "vite" },
  { dir: "farmacia-vitalis", path: "vitalis", stack: "vite" },
  { dir: "finanzas-prospera", path: "prospera", stack: "vite" },
  { dir: "crm-nucleo", path: "nucleo", stack: "vite" },
  { dir: "movilidad-vianova", path: "vianova", stack: "vite" },
  { dir: "nexo-lab", path: "nexo-lab", stack: "vite" },
];

const script = process.argv[2];
const TIMEOUT_MS = Number(process.env.RUN_ALL_TIMEOUT || 6 * 60 * 1000); // 6 min
if (!script) {
  console.error("Uso: node scripts/run-all.mjs <lint|test|build>");
  process.exit(2);
}

const ts = () => new Date().toTimeString().slice(0, 8);
const log = (m) => console.log(`[${ts()}] ${m}`);

function baseEnv(p) {
  if (script !== "build") return {};
  return p.stack === "vite"
    ? { VITE_BASE: `/web-pages-templates/${p.path}/` }
    : { NEXT_PUBLIC_BASE_PATH: `/web-pages-templates/${p.path}` };
}

function hasScript(dir) {
  const pkgPath = join(ROOT, dir, "package.json");
  if (!existsSync(pkgPath)) return false;
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  return Boolean(pkg.scripts && pkg.scripts[script]);
}

function run(p) {
  return new Promise((resolve) => {
    if (!hasScript(p.dir)) {
      log(`${p.dir} — sin script "${script}", omitido`);
      return resolve({ dir: p.dir, status: "skip", ms: 0 });
    }
    const start = Date.now();
    log(`Ejecutando ${p.dir} — ${script}`);
    const child = spawn("npm", ["run", script], {
      cwd: join(ROOT, p.dir),
      shell: true,
      env: { ...process.env, ...baseEnv(p) },
    });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));

    const heartbeat = setInterval(() => {
      const secs = Math.round((Date.now() - start) / 1000);
      log(`${p.dir} — ${script} continúa activo (${secs} s)`);
    }, 30_000);

    const killer = setTimeout(() => {
      log(`${p.dir} — ${script} TIMEOUT (${Math.round(TIMEOUT_MS / 1000)} s) → terminado`);
      child.kill("SIGKILL");
    }, TIMEOUT_MS);

    child.on("close", (code) => {
      clearInterval(heartbeat);
      clearTimeout(killer);
      const secs = Math.round((Date.now() - start) / 1000);
      if (code === 0) {
        log(`${p.dir} — ${script} PASSED (${secs} s)`);
        resolve({ dir: p.dir, status: "pass", ms: secs });
      } else {
        log(`${p.dir} — ${script} FAILED (code ${code}, ${secs} s)`);
        console.log(out.split("\n").slice(-20).join("\n"));
        resolve({ dir: p.dir, status: "fail", ms: secs, out });
      }
    });
  });
}

const results = [];
for (const p of PROJECTS) results.push(await run(p));

console.log("\n──────── Resumen (" + script + ") ────────");
for (const r of results) {
  const icon = r.status === "pass" ? "✓" : r.status === "skip" ? "·" : "✗";
  console.log(`  ${icon} ${r.dir.padEnd(28)} ${r.status.toUpperCase()} ${r.ms ? r.ms + "s" : ""}`);
}
const failed = results.filter((r) => r.status === "fail");
console.log(`\n${results.filter((r) => r.status === "pass").length} ok · ${failed.length} fallo(s)`);
process.exit(failed.length ? 1 : 0);
