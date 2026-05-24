import { useEffect, useState } from "react";
import { getUserRole } from "../blockchain/interact";
import { Role } from "../utils/roles";

export const useUserRole = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const userRole = await getUserRole(accounts[0]);
        setRole(userRole);
      } catch {
        setRole(Role.NONE);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, loading };
};
