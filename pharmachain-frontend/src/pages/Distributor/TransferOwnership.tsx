import { useState } from "react";
import { transferOwnership, getProduct } from "../../blockchain/interact";
import { Role } from "../../utils/roles";
import { useUserRole } from "../../hooks/useUserRole";
import RoleGuard from "../../components/RoleGuard";
import { isAddress } from "ethers";
import type { ProductData } from "../../blockchain/interact";

const FOUR_DAYS_SECONDS = 4 * 24 * 60 * 60;

const TransferOwnership = () => {
  const { role, loading: roleLoading } = useUserRole();

  const [productId, setProductId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentOwner, setCurrentOwner] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [expired, setExpired] = useState(false);

  // 🔍 Fetch product + check expiry
  const checkOwner = async () => {
    if (!productId) return;

    try {
      const data = await getProduct(Number(productId));
      setProduct(data);
      setCurrentOwner(data.owner);

      if (data.distributedAt) {
        const expiry =
          data.distributedAt.getTime() / 1000 + FOUR_DAYS_SECONDS;
        const now = Date.now() / 1000;
        setExpired(now > expiry);
      }
    } catch {
      alert("Product not found");
      setProduct(null);
      setCurrentOwner(null);
      setExpired(false);
    }
  };

  // 🔁 Transfer ownership
  const handleTransfer = async () => {
    if (expired) {
      alert("Transfer window expired. Product can no longer be transferred.");
      return;
    }

    if (!productId || !newOwner) {
      alert("All fields are required");
      return;
    }

    if (!isAddress(newOwner)) {
      alert("Invalid Ethereum address");
      return;
    }

    try {
      setLoading(true);
      await transferOwnership(Number(productId), newOwner);
      alert("Ownership transferred to retailer!");

      setProductId("");
      setNewOwner("");
      setCurrentOwner(null);
      setProduct(null);
      setExpired(false);
    } catch (error: any) {
      console.error(error);
      alert(error?.reason || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Wait until role is known
  if (roleLoading || role === null) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Checking role...
      </p>
    );
  }

  return (
    <RoleGuard userRole={role} allowed={[Role.DISTRIBUTOR]}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 border border-blue-100">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Distributor Transfer
            </h2>

            <p className="text-slate-600 text-lg">
              Transfer product ownership to retailer
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">

            {/* Product ID */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product ID
              </label>

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Enter Product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="flex-1 p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
                />

                <button
                  onClick={checkOwner}
                  className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 rounded-xl shadow-lg font-semibold"
                >
                  Check
                </button>
              </div>
            </div>

            {/* Current Owner */}
            {currentOwner && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-4 rounded-xl">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Current Owner
                </p>
                <p className="font-mono text-xs text-blue-700 break-all bg-white px-3 py-2 rounded-lg">
                  {currentOwner}
                </p>
              </div>
            )}

            {/* Expiry Warning */}
            {expired && (
              <div className="bg-red-50 border-2 border-red-400 p-4 rounded-xl text-red-700 font-bold">
                ❌ Transfer window expired (4 days passed).
                Product can no longer be transferred.
              </div>
            )}

            {/* New Owner */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Retailer Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg font-mono"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleTransfer}
              disabled={loading || expired}
              className={`w-full py-4 rounded-xl font-semibold shadow-lg text-lg transition-all
                ${
                  expired
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                }`}
            >
              {expired
                ? "Transfer Expired"
                : loading
                ? "Transferring..."
                : "Transfer to Retailer"}
            </button>

          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default TransferOwnership;
