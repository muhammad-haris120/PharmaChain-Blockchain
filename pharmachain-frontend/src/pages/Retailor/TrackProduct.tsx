import { useState } from "react";
import Layout from "../../components/Layout";
import { getProduct } from "../../blockchain/interact";
import type { ProductData } from "../../blockchain/interact";
import ProductTimeline from "../../components/ProductTimeline";
import ProductActivityLog from "../../components/ProductActivityLog";

const TrackProduct = () => {
  const [searchId, setSearchId] = useState("");
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchId) return;

    setLoading(true);
    setError("");
    setProduct(null);

    try {
      const data = await getProduct(Number(searchId));
      setProduct(data);
    } catch (err) {
      console.error(err);
      setError("Product not found or invalid ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Heading */}
          <div className="text-center mb-10">
            <div className="inline-block bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg mb-4">
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Track Product (Retailer)
            </h1>
            <p className="text-slate-600 text-lg">
              Verify product authenticity and ownership
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product ID
            </label>

            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Enter Product ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 text-lg"
              />

              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 font-semibold shadow-lg transition"
              >
                {loading ? "Searching..." : "Track"}
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border-2 border-red-300 text-red-700 p-4 rounded-xl font-semibold">
                {error}
              </div>
            )}
          </div>

          {/* Product Details */}
          {product && (
            <div className="bg-white border-2 border-green-200 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-green-900 mb-6">
                Product Details
              </h2>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-gray-600">
                    Product ID
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {product.id}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-gray-600">Status</p>
                  <span
                    className={`inline-block px-6 py-2 rounded-full text-white font-bold ${getStatusColor(
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
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-gray-600">
                    Current Owner
                  </p>
                  <span className="font-mono text-sm bg-white px-4 py-2 rounded-lg break-all inline-block">
                    {product.owner}
                  </span>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-gray-600">
                    Product Name
                  </p>
                  <p className="text-xl font-bold">{product.name}</p>
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
      return "bg-blue-500";
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
