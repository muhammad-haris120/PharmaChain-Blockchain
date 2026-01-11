interface RoleBadgeProps {
  role: string;
}

const roleColors: Record<string, string> = {
  MANUFACTURER: "bg-blue-100 text-blue-700",
  DISTRIBUTOR: "bg-green-100 text-green-700",
  RETAILER: "bg-purple-100 text-purple-700",
};

const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        roleColors[role] || "bg-gray-200 text-gray-700"
      }`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;
