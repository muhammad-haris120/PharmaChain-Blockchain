import { useState } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { transferOwnership } from "../../blockchain/interact";
import { useWallet } from "../../hooks/useWallet";

const AcceptProduct = () => {
  const { address } = useWallet();
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAccept = async () => {
    setMessage("");
    setError("");

    try {
      const id = Number(productId);
      if (isNaN(id)) throw new Error("Invalid product ID");
      if (!address) throw new Error("Wallet not connected");

      setLoading(true);

      // Distributor accepts ownership
      await transferOwnership(id, address);

      setMessage("Product accepted successfully!");
      setProductId("");
    } catch (err: any) {
      setError(err.message || "Failed to accept product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 border border-emerald-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
              Accept Product
            </h1>
            <p className="text-slate-600 text-lg">
              Distributor panel — confirm receipt of product from manufacturer
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product ID
              </label>
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter Product ID"
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all outline-none text-lg"
              />
            </div>

            <Button onClick={handleAccept} disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Accepting...
                </span>
              ) : (
                "Accept Product"
              )}
            </Button>

            {message && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500 text-emerald-700 p-4 rounded-xl flex items-center gap-3 animate-pulse">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold">{message}</p>
              </div>
            )}
            
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-500 text-red-700 p-4 rounded-xl flex items-center gap-3">
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AcceptProduct;