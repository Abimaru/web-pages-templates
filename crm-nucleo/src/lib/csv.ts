import type { Contact } from "../data/crm";

/**
 * Celda CSV segura: escapa comillas/comas/saltos y neutraliza fórmulas (=, +, -, @) para evitar
 * "CSV injection" al abrir el archivo en Excel o Sheets.
 */
export function csvCell(value: string | number): string {
  let s = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[",\n\r;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function toCsv(rows: (string | number)[][]): string {
  return rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}

export const CONTACT_HEADERS = ["Nombre", "Empresa", "Correo", "Teléfono", "Estado", "Valor (COP)", "Último contacto"];

export function contactsToCsv(list: Contact[]): string {
  return toCsv([CONTACT_HEADERS, ...list.map((c) => [c.name, c.company, c.email, c.phone, c.status, c.value, c.lastContact])]);
}
