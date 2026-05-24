import { useState } from "react";
import { usePharmaChain } from "../../hooks/usePharmaChain";
import { isAddress } from "ethers";
import { Role } from "../../utils/roles";
import { useUserRole } from "../../hooks/useUserRole";
import RoleGuard from "../../components/RoleGuard";

const SellProduct = () => {
  const { sell } = usePharmaChain();
  const { role, loading: roleLoading } = useUserRole();

  const [productId, setProductId] = useState("");
  const [buyer, setBuyer] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSell = async () => {
    setMessage("");
    setError("");

    try {
      const id = Number(productId);
      if (isNaN(id)) throw new Error("Invalid product ID");
      if (!isAddress(buyer)) throw new Error("Invalid buyer address");

      setLoading(true);
      await sell(id, buyer);

      setMessage("Product sold successfully!");
      setProductId("");
      setBuyer("");
    } catch (err: any) {
      setError(err?.message || "Sale failed");
    } finally {
      setLoading(false);
    }
  };

  if (roleLoading) return null;

  return (
    <RoleGuard allowed={[Role.RETAILER]} userRole={role || Role.RETAILER}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-100 to-green-100 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 border border-emerald-100">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">
              Sell Product
            </h2>

            <p className="text-slate-600 text-lg">
              Retailer panel — final product sale
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product ID
              </label>
              <input
                type="number"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Buyer Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 outline-none text-lg font-mono"
              />
            </div>

            <button
              onClick={handleSell}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105 transition-all text-lg"
            >
              {loading ? "Selling..." : "Sell Product"}
            </button>

            {message && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-500 text-emerald-700 p-4 rounded-xl font-semibold">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-500 text-red-700 p-4 rounded-xl font-semibold">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default SellProduct;
