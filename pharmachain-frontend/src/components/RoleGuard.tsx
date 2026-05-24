import type { ReactNode } from "react";
import { Role } from "../utils/roles";

interface Props {
  userRole: Role;
  allowed: Role[];
  children: ReactNode;
}

const RoleGuard = ({ userRole, allowed, children }: Props) => {
  if (!allowed.includes(userRole)) {
    return (
      <div className="p-6 bg-red-50 border-2 border-red-400 rounded-xl text-red-700 font-semibold">
        ⛔ Access Denied – You are not authorized to view this section.
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
