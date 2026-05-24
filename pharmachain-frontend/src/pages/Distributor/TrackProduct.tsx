import { useState } from "react";
import Layout from "../../components/Layout";
import { getProduct } from "../../blockchain/interact";
import type { ProductData } from "../../blockchain/interact";
import ProductTimeline from "../../components/ProductTimeline";
import DistributorCountdown from "../../components/DistributorCountdown";
import ProductActivityLog from "../../components/ProductActivityLog";

const FOUR_DAYS_SECONDS = 4 * 24 * 60 * 60;

const TrackProduct = () => {
  const [searchId, setSearchId] = useState("");
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);

  const handleSearch = async () => {
    if (!searchId) return;

    setLoading(true);
    setError("");
    setProduct(null);
    setExpired(false);

    try {
      const data = await getProduct(Number(searchId));
      setProduct(data);

      // ⏳ Expiry check (Distributor window)
      if (data.distributedAt) {
        const expiry =
          data.distributedAt.getTime() / 1000 + FOUR_DAYS_SECONDS;
        const now = Date.now() / 1000;
        setExpired(now > expiry);
      }
    } catch (err) {
      console.error(err);
      setError("Product not found or invalid ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg mb-4">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Track Product
            </h1>

            <p className="text-slate-600 text-lg">
              Distributor product tracking and verification
            </p>
          </div>

          {/* Search */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100 mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product ID
            </label>

            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Enter Product ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 text-lg"
              />

              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 font-semibold shadow-lg transition"
              >
                {loading ? "Searching..." : "Track"}
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl">
                {error}
              </div>
            )}
          </div>

          {/* Product Details */}
          {product && (
            <div className="bg-white border-2 border-indigo-200 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-indigo-800 mb-6">
                Product Details
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Product ID</p>
                  <p className="text-xl font-bold">{product.id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Product Name</p>
                  <p className="text-xl font-bold">{product.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>

                  <ProductTimeline
                    status={product.status}
                    registeredAt={product.registeredAt}
                    distributedAt={product.distributedAt}
                    retailingAt={product.retailingAt}
                    soldAt={product.soldAt}
                  />
                  <ProductActivityLog productId={product.id} />

                  {/* ⏳ Countdown ONLY if not expired */}
                  {product.status === "Distributed" &&
                    !expired &&
                    product.distributedAt && (
                      <DistributorCountdown
                        distributedAt={product.distributedAt}
                      />
                    )}

                  {/* ❌ Expired message */}
                  {product.status === "Distributed" && expired && (
                    <div className="mt-4 bg-red-50 border-2 border-red-400 p-4 rounded-xl text-red-700 font-bold">
                      ❌ Distributor transfer window expired (4 days passed).
                      Product can no longer be transferred.
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-500">Current Owner</p>
                  <p className="font-mono bg-gray-100 p-2 rounded text-sm break-all">
                    {product.owner}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Registered":
      return "bg-blue-600";
    case "Distributed":
      return "bg-yellow-500";
    case "Retailing":
      return "bg-purple-500";
    case "Sold":
      return "bg-green-600";
    default:
      return "bg-gray-500";
  }
};

export default TrackProduct;
