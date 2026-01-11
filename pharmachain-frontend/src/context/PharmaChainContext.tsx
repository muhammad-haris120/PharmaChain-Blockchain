// src/context/PharmaChainContext.tsx
import { useEffect, useState } from "react";
import {
  getUserRole,
  getProduct,
  sellProduct,
} from "../blockchain/interact";
import { Role } from "../utils/roles";
import { useWallet } from "../hooks/useWallet";
import { PharmaChainContext } from "./PharmaChainContextDefinition";

export const PharmaChainProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { account } = useWallet();
  const [role, setRole] = useState<Role>(Role.NONE);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch user role
  useEffect(() => {
    const fetchRole = async () => {
      if (!account) {
        setRole(Role.NONE);
        setLoading(false);
        return;
      }

      try {
        const userRole = await getUserRole(account);
        setRole(userRole);
      } catch (error) {
        console.error("Error fetching role:", error);
        setRole(Role.NONE);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [account]);

  // ===============================
  // TRACK (uses existing getProduct)
  // ===============================
  const track = async (productId: string) => {
    const id = Number(productId);
    if (isNaN(id)) {
      throw new Error("Invalid product ID");
    }

    const product = await getProduct(id);

    return {
      ...product,
      role,
    };
  };

  // ===============================
  // SELL (uses existing sellProduct)
  // ===============================
  const sell = async (productId: number, buyer: string) => {
    if (productId === undefined || productId === null || isNaN(productId)) {
      throw new Error("Invalid product ID"); 
    }

    await sellProduct(productId, buyer);
  };

  return (
    <PharmaChainContext.Provider
      value={{
        role,
        loading,
        track,
        sell,
      }}
    >
      {children}
    </PharmaChainContext.Provider>
  );
};
