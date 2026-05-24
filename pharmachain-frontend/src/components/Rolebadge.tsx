const roleColors: Record<string, string> = {
  MANUFACTURER: "from-blue-500 to-blue-600 shadow-blue-200",
  DISTRIBUTOR: "from-yellow-500 to-orange-600 shadow-yellow-200",
  RETAILER: "from-green-500 to-emerald-600 shadow-green-200",
};

const RoleBadge = ({ role }: { role: string }) => {
  const colorClass = roleColors[role] || "from-gray-500 to-gray-600 shadow-gray-200";
  
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full font-bold bg-gradient-to-r ${colorClass} text-white shadow-lg`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      {role}
    </span>
  );
};

export default RoleBadge;