import { useState } from "react";
import { transferOwnership, getPharmaChainContract } from "../../blockchain/interact";
import { isAddress } from "ethers";

const TransferOwnership = () => {
  const [productId, setProductId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentOwner, setCurrentOwner] = useState<string | null>(null);

  const checkOwner = async () => {
    if (!productId) return;
    try {
      const contract = await getPharmaChainContract();
      const product = await contract.products(productId);
      setCurrentOwner(product.owner);
    } catch {
      alert("Product not found");
    }
  };

  const handleTransfer = async () => {
    if (!productId || !newOwner) return alert("All fields required");
    if (!isAddress(newOwner)) return alert("Invalid address");

    try {
      setLoading(true);
      await transferOwnership(Number(productId), newOwner);
      alert("Ownership transferred!");
      setProductId("");
      setNewOwner("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 border border-purple-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Transfer Ownership
          </h2>
          <p className="text-slate-600 text-lg">
            Transfer product to distributor or retailer
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Product ID
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="flex-1 p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none text-lg"
              />
              <button
                onClick={checkOwner}
                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg font-semibold"
              >
                Check
              </button>
            </div>
          </div>

          {currentOwner && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-4 rounded-xl">
              <p className="text-sm font-semibold text-purple-900 mb-2">Current Owner:</p>
              <p className="font-mono text-xs text-purple-700 break-all bg-white px-3 py-2 rounded-lg">
                {currentOwner}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              New Owner Address
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none text-lg font-mono"
            />
          </div>

          <button
            onClick={handleTransfer}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Transferring...
              </span>
            ) : (
              "Transfer Ownership"
            )}
          </button>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-sm text-purple-800">
                Transfer is recorded on the blockchain and creates an immutable audit trail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferOwnership;