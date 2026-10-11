import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { initialState, create as createIn, moveDeal as moveIn, toggleTask as toggleIn, type CrmState, type Draft } from "../lib/crmState";
import type { Stage } from "../data/crm";

type Store = CrmState & {
  /** Crea un registro; devuelve el mensaje de error o null si se creó. */
  create: (draft: Draft) => string | null;
  moveDeal: (id: number, stage: Stage) => void;
  toggleTask: (id: number) => void;
};

const Ctx = createContext<Store | null>(null);

export function CrmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CrmState>(initialState);
  // Referencia al estado más reciente: permite validar y devolver el error de forma síncrona.
  const ref = useRef(state);
  const commit = useCallback((next: CrmState) => { ref.current = next; setState(next); }, []);

  const create = useCallback((draft: Draft) => {
    const r = createIn(ref.current, draft);
    if (!r.ok) return r.error;
    commit(r.state);
    return null;
  }, [commit]);
  const moveDeal = useCallback((id: number, stage: Stage) => commit(moveIn(ref.current, id, stage)), [commit]);
  const toggleTask = useCallback((id: number) => commit(toggleIn(ref.current, id)), [commit]);

  const value = useMemo(() => ({ ...state, create, moveDeal, toggleTask }), [state, create, moveDeal, toggleTask]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCrm() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCrm debe usarse dentro de <CrmProvider>");
  return c;
}
