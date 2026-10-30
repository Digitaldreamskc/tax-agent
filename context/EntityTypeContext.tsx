"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type EntityType = "business" | "nonprofit";

interface EntityTypeContextValue {
  entityType: EntityType;
  setEntityType: (type: EntityType) => void;
  isNonprofit: boolean;
}

const EntityTypeContext = createContext<EntityTypeContextValue>({
  entityType: "business",
  setEntityType: () => {},
  isNonprofit: false,
});

export function EntityTypeProvider({ children }: { children: React.ReactNode }) {
  const [entityType, setEntityTypeState] = useState<EntityType>("business");

  useEffect(() => {
    const stored = localStorage.getItem("entityType") as EntityType | null;
    if (stored === "business" || stored === "nonprofit") {
      setEntityTypeState(stored);
    }
  }, []);

  const setEntityType = (type: EntityType) => {
    localStorage.setItem("entityType", type);
    setEntityTypeState(type);
  };

  return (
    <EntityTypeContext.Provider
      value={{ entityType, setEntityType, isNonprofit: entityType === "nonprofit" }}
    >
      {children}
    </EntityTypeContext.Provider>
  );
}

export function useEntityType() {
  return useContext(EntityTypeContext);
}
