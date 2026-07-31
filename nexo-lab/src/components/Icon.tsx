/* Mapa de iconos (lucide-react) con imports explícitos para tree-shaking.
 * Los datos referencian iconos por nombre (string); aquí se resuelven a componentes.
 * Si un nombre no está mapeado, cae en un icono genérico. */
import {
  Boxes,
  Server,
  Search,
  GitBranch,
  TestTubes,
  BrainCircuit,
  AppWindow,
  ScanSearch,
  Radar,
  Rocket,
  Cloud,
  Wrench,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Compass,
  Network,
  Stethoscope,
  PenTool,
  Hammer,
  Share2,
  Cpu,
  Layers,
  Workflow,
  Activity,
  Lock,
  Database,
  Zap,
  GitMerge,
  Route,
  CircleDot,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const MAP: Record<string, ComponentType<LucideProps>> = {
  Boxes,
  Server,
  Search,
  GitBranch,
  TestTubes,
  BrainCircuit,
  AppWindow,
  ScanSearch,
  Radar,
  Rocket,
  Cloud,
  Wrench,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Compass,
  Network,
  Stethoscope,
  PenTool,
  Hammer,
  Share2,
  Cpu,
  Layers,
  Workflow,
  Activity,
  Lock,
  Database,
  Zap,
  GitMerge,
  Route,
};

interface IconProps extends LucideProps {
  name: string;
}

export default function Icon({ name, ...props }: IconProps) {
  const Cmp = MAP[name] ?? CircleDot;
  return <Cmp {...props} />;
}
