"use client";

import { useEffect, useState } from "react";

const lines = [
  { prompt: "nexora@vanguardia:~$", cmd: "diagnostico --sistema", delay: 40 },
  { out: "✓ CPU ................ óptimo", delay: 18 },
  { out: "✓ Memoria RAM ........ 32GB estable", delay: 18 },
  { out: "✓ Almacenamiento NVMe  lectura 7000MB/s", delay: 18 },
  { out: "✓ Temperatura ........ 42°C", delay: 18 },
  { prompt: "nexora@vanguardia:~$", cmd: "deploy futuro --now", delay: 40 },
  { out: "› Optimizando tu experiencia...", delay: 22 },
  { out: "✔ Listo. Bienvenido a la vanguardia.", delay: 22 },
];

type Rendered = { text: string; kind: "prompt" | "out"; cmd?: string };

export default function Terminal() {
  const [rendered, setRendered] = useState<Rendered[]>([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    async function run() {
      while (idx < lines.length) {
        if (cancelled) return;
        const line = lines[idx];
        if ("cmd" in line && line.cmd) {
          // efecto de tipeo del comando
          for (let i = 0; i <= line.cmd.length; i++) {
            if (cancelled) return;
            setTyping(line.cmd.slice(0, i));
            await sleep(line.delay);
          }
          setRendered((r) => [...r, { text: line.prompt!, kind: "prompt", cmd: line.cmd }]);
          setTyping("");
        } else {
          await sleep(line.delay * 6);
          setRendered((r) => [...r, { text: (line as { out: string }).out, kind: "out" }]);
        }
        idx++;
      }
      if (!cancelled) setDone(true);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="terminal overflow-hidden">
      <div className="flex items-center gap-2 border-b border-electric/15 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="mono ml-3 text-xs text-white/40">nexora — bash</span>
      </div>
      <div className="mono min-h-[248px] space-y-1.5 p-5 text-[13px] leading-relaxed">
        {rendered.map((l, i) =>
          l.kind === "prompt" ? (
            <div key={i}>
              <span className="text-teal">{l.text}</span>{" "}
              <span className="text-white">{l.cmd}</span>
            </div>
          ) : (
            <div key={i} className="text-electric/90">
              {l.text}
            </div>
          )
        )}
        {!done && (
          <div>
            <span className="text-teal">nexora@vanguardia:~$</span>{" "}
            <span className="text-white">{typing}</span>
            <span className="animate-blink text-electric">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
