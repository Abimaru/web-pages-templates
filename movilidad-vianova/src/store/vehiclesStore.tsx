import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export const MAX_COMPARE = 3;

type Store = {
  compare: string[];
  toggleCompare: (id: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;
  compareFull: boolean;

  detailId: string | null;
  openDetail: (id: string) => void;
  closeDetail: () => void;

  // Vehículo preseleccionado para el simulador (cockpit)
  simulateId: string | null;
  setSimulate: (id: string | null) => void;
};

const Ctx = createContext<Store | null>(null);

export function VehiclesProvider({ children }: { children: ReactNode }) {
  const [compare, setCompare] = useState<string[]>([]);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [simulateId, setSimulateId] = useState<string | null>(null);

  const toggleCompare = useCallback((id: string) => {
    setCompare((list) => {
      if (list.includes(id)) return list.filter((x) => x !== id);
      if (list.length >= MAX_COMPARE) return list;
      return [...list, id];
    });
  }, []);

  const removeCompare = useCallback((id: string) => setCompare((l) => l.filter((x) => x !== id)), []);
  const clearCompare = useCallback(() => setCompare([]), []);
  const isComparing = useCallback((id: string) => compare.includes(id), [compare]);

  const openDetail = useCallback((id: string) => setDetailId(id), []);
  const closeDetail = useCallback(() => setDetailId(null), []);

  return (
    <Ctx.Provider
      value={{
        compare,
        toggleCompare,
        removeCompare,
        clearCompare,
        isComparing,
        compareFull: compare.length >= MAX_COMPARE,
        detailId,
        openDetail,
        closeDetail,
        simulateId,
        setSimulate: setSimulateId,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useVehicles() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useVehicles debe usarse dentro de <VehiclesProvider>");
  return c;
}
