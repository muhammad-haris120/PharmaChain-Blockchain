/**
 * User roles in PharmaChain
 * MUST exactly match the Solidity enum order
 */
export const Role = {
  NONE: 0,
  MANUFACTURER: 1,
  DISTRIBUTOR: 2,
  RETAILER: 3,
} as const;

export type Role = typeof Role[keyof typeof Role];

/**
 * Convert role enum to readable label
 */
export const roleToLabel = (role: Role): string => {
  switch (role) {
    case Role.MANUFACTURER:
      return "Manufacturer";
    case Role.DISTRIBUTOR:
      return "Distributor";
    case Role.RETAILER:
      return "Retailer";
    default:
      return "Unassigned";
  }
};

/**
 * Check if user has required role
 */
export const hasRequiredRole = (
  userRole: Role,
  allowedRoles: Role[]
): boolean => {
  return allowedRoles.includes(userRole);
};
