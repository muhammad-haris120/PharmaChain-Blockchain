interface Props {
  id: number;
  name: string;
  owner: string;
  status: string;
}

const ProductCard = ({ id, name, owner, status }: Props) => {
  const getStatusColor = () => {
    switch (status.toUpperCase()) {
      case "REGISTERED":
        return "from-blue-500 to-blue-600";
      case "IN_TRANSIT":
      case "DISTRIBUTED":
        return "from-yellow-500 to-orange-500";
      case "RETAILING":
        return "from-purple-500 to-pink-500";
      case "SOLD":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-2xl shadow-xl border-2 border-indigo-200 hover:shadow-2xl transition-all transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">{name}</h3>
            <p className="text-sm text-slate-500">Product #{id}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <p className="text-xs text-slate-500 mb-1 font-medium">Product ID</p>
          <p className="text-lg font-bold text-indigo-600">{id}</p>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm">
          <p className="text-xs text-slate-500 mb-2 font-medium">Current Owner</p>
          <p className="text-xs font-mono break-all bg-slate-100 px-2 py-1 rounded">
            {owner}
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm">
          <p className="text-xs text-slate-500 mb-2 font-medium">Status</p>
          <span className={`inline-block bg-gradient-to-r ${getStatusColor()} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}>
            {status.replace("_", " ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;