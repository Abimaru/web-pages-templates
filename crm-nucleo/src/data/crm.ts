// Datos de DEMOSTRACIÓN (mock). En producción vendrían de una API/BD.
export const money = (n: number) => "$" + n.toLocaleString("es-CO");
export const moneyShort = (n: number) =>
  n >= 1_000_000 ? "$" + (n / 1_000_000).toFixed(1) + "M" : "$" + (n / 1000).toFixed(0) + "k";

const palette = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#ec4899", "#14b8a6"];
export const avatarColor = (name: string) =>
  palette[name.charCodeAt(0) % palette.length];
export const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export type ContactStatus = "Cliente" | "Prospecto" | "Inactivo";
export type Contact = {
  id: number; name: string; company: string; email: string; phone: string;
  status: ContactStatus; value: number; lastContact: string;
};

export const contacts: Contact[] = [
  { id: 1, name: "Valentina Ríos", company: "Andina Retail", email: "v.rios@andina.co", phone: "+57 301 555 0134", status: "Cliente", value: 42_000_000, lastContact: "Hace 2 días" },
  { id: 2, name: "Mateo Guerrero", company: "TechnoSur", email: "mateo@technosur.io", phone: "+57 310 555 0192", status: "Prospecto", value: 18_500_000, lastContact: "Hoy" },
  { id: 3, name: "Camila Ospina", company: "Verde Orgánica", email: "camila@verde.co", phone: "+57 320 555 0177", status: "Cliente", value: 65_000_000, lastContact: "Hace 1 semana" },
  { id: 4, name: "Sebastián Nieto", company: "LogiExpress", email: "s.nieto@logiexpress.co", phone: "+57 315 555 0143", status: "Prospecto", value: 9_800_000, lastContact: "Ayer" },
  { id: 5, name: "Isabela Marín", company: "Estudio Kavan", email: "isa@kavan.design", phone: "+57 300 555 0121", status: "Cliente", value: 31_200_000, lastContact: "Hace 3 días" },
  { id: 6, name: "Andrés Cárdenas", company: "FinNova", email: "andres@finnova.co", phone: "+57 312 555 0188", status: "Inactivo", value: 0, lastContact: "Hace 2 meses" },
  { id: 7, name: "Laura Peña", company: "Salud Total", email: "laura@saludtotal.co", phone: "+57 318 555 0155", status: "Cliente", value: 54_700_000, lastContact: "Hace 5 días" },
  { id: 8, name: "Julián Torres", company: "GameForge", email: "julian@gameforge.gg", phone: "+57 305 555 0166", status: "Prospecto", value: 22_000_000, lastContact: "Hoy" },
  { id: 9, name: "Daniela Vargas", company: "Moda Marú", email: "dani@modamaru.co", phone: "+57 314 555 0199", status: "Cliente", value: 27_500_000, lastContact: "Hace 1 día" },
  { id: 10, name: "Ricardo Salcedo", company: "Constructora Alza", email: "r.salcedo@alza.co", phone: "+57 317 555 0102", status: "Prospecto", value: 88_000_000, lastContact: "Hace 4 días" },
  { id: 11, name: "Paola Restrepo", company: "EduFuturo", email: "paola@edufuturo.co", phone: "+57 319 555 0111", status: "Cliente", value: 15_300_000, lastContact: "Hace 6 días" },
  { id: 12, name: "Felipe Cano", company: "AgroPacífico", email: "felipe@agropacifico.co", phone: "+57 302 555 0123", status: "Inactivo", value: 0, lastContact: "Hace 3 meses" },
];

export const stages = ["Prospecto", "Contactado", "Propuesta", "Negociación", "Ganado"] as const;
export type Stage = (typeof stages)[number];
export type Deal = { id: number; title: string; company: string; value: number; stage: Stage; owner: string };

export const deals: Deal[] = [
  { id: 1, title: "Implementación ERP", company: "Andina Retail", value: 42_000_000, stage: "Negociación", owner: "Ana" },
  { id: 2, title: "Licencias anuales", company: "TechnoSur", value: 18_500_000, stage: "Propuesta", owner: "Luis" },
  { id: 3, title: "Rediseño web + SEO", company: "Verde Orgánica", value: 12_000_000, stage: "Ganado", owner: "Ana" },
  { id: 4, title: "Integración logística", company: "LogiExpress", value: 9_800_000, stage: "Contactado", owner: "Marta" },
  { id: 5, title: "Branding completo", company: "Estudio Kavan", value: 15_200_000, stage: "Propuesta", owner: "Luis" },
  { id: 6, title: "Consultoría financiera", company: "FinNova", value: 26_000_000, stage: "Prospecto", owner: "Ana" },
  { id: 7, title: "App móvil", company: "Salud Total", value: 54_700_000, stage: "Negociación", owner: "Marta" },
  { id: 8, title: "Campaña Q3", company: "GameForge", value: 22_000_000, stage: "Contactado", owner: "Luis" },
  { id: 9, title: "Tienda e-commerce", company: "Moda Marú", value: 27_500_000, stage: "Ganado", owner: "Ana" },
  { id: 10, title: "Obra corporativa", company: "Constructora Alza", value: 88_000_000, stage: "Prospecto", owner: "Marta" },
  { id: 11, title: "Plataforma cursos", company: "EduFuturo", value: 15_300_000, stage: "Propuesta", owner: "Luis" },
  { id: 12, title: "Soporte premium", company: "Andina Retail", value: 8_400_000, stage: "Contactado", owner: "Ana" },
];

export type Priority = "Alta" | "Media" | "Baja";
export type Task = { id: number; title: string; who: string; due: string; priority: Priority; done: boolean };

export const tasks: Task[] = [
  { id: 1, title: "Llamar a Valentina para cierre", who: "Andina Retail", due: "Hoy, 3:00 PM", priority: "Alta", done: false },
  { id: 2, title: "Enviar propuesta actualizada", who: "TechnoSur", due: "Hoy, 5:00 PM", priority: "Alta", done: false },
  { id: 3, title: "Preparar demo del producto", who: "GameForge", due: "Mañana", priority: "Media", done: false },
  { id: 4, title: "Seguimiento post-venta", who: "Verde Orgánica", due: "Mañana", priority: "Baja", done: false },
  { id: 5, title: "Renovar contrato anual", who: "Salud Total", due: "En 2 días", priority: "Media", done: false },
  { id: 6, title: "Agendar reunión de obra", who: "Constructora Alza", due: "En 3 días", priority: "Alta", done: false },
  { id: 7, title: "Actualizar datos de contacto", who: "EduFuturo", due: "Esta semana", priority: "Baja", done: true },
  { id: 8, title: "Reactivar cuenta inactiva", who: "FinNova", due: "Esta semana", priority: "Media", done: true },
];

export type Activity = { who: string; action: string; when: string; color: string };
export const activities: Activity[] = [
  { who: "Ana", action: "movió “App móvil” a Negociación", when: "hace 12 min", color: "#4f46e5" },
  { who: "Luis", action: "envió una propuesta a TechnoSur", when: "hace 40 min", color: "#0ea5e9" },
  { who: "Marta", action: "cerró el negocio “Tienda e-commerce”", when: "hace 2 h", color: "#10b981" },
  { who: "Ana", action: "agregó a Ricardo Salcedo como prospecto", when: "hace 3 h", color: "#f59e0b" },
  { who: "Luis", action: "completó la tarea “Actualizar datos”", when: "ayer", color: "#8b5cf6" },
];

// Series para gráficos
export const revenueSeries = [
  { m: "Ene", v: 82 }, { m: "Feb", v: 74 }, { m: "Mar", v: 96 }, { m: "Abr", v: 88 },
  { m: "May", v: 110 }, { m: "Jun", v: 102 }, { m: "Jul", v: 128 }, { m: "Ago", v: 141 },
];

export const sourceSplit = [
  { label: "Referidos", value: 38, color: "#4f46e5" },
  { label: "Web", value: 27, color: "#0ea5e9" },
  { label: "Redes", value: 21, color: "#10b981" },
  { label: "Eventos", value: 14, color: "#f59e0b" },
];

export const reps = [
  { name: "Ana Gómez", deals: 14, revenue: 96_000_000 },
  { name: "Luis Parra", deals: 11, revenue: 71_000_000 },
  { name: "Marta Ruiz", deals: 9, revenue: 152_000_000 },
];
