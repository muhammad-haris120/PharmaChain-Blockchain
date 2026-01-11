import { useContext } from "react";
import { PharmaChainContext } from "../context/PharmaChainContextDefinition";

/**
 * Custom hook to access PharmaChain blockchain functions
 * This hook is ONLY a wrapper around the context
 */
export const usePharmaChain = () => {
  const context = useContext(PharmaChainContext);

  if (!context) {
    throw new Error(
      "usePharmaChain must be used within a PharmaChainProvider"
    );
  }

  return context;
};
