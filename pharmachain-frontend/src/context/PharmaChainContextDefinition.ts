// src/context/PharmaChainContextDefinition.ts
import { createContext } from "react";
import { Role } from "../utils/roles";
import { useContext } from "react";

export const usePharmaChain = () => {
  const context = useContext(PharmaChainContext);
  if (!context) {
    throw new Error("usePharmaChain must be used within a PharmaChainProvider");
  }
  return context;
};

export type PharmaChainContextType = {
  role: Role;
  loading: boolean;

  track: (productId: string) => Promise<{
    id: any;
    name: any;
    owner: any;
    status: string;
    role: Role;
  }>;

  sell: (productId: number, buyer: string) => Promise<void>;
};


export const PharmaChainContext = createContext<PharmaChainContextType | null>(null);