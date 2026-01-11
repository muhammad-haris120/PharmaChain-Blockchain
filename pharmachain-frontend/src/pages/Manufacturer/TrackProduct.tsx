import { useState } from "react";
import Layout from "../../components/Layout";
import { getProduct } from "../../blockchain/interact";
import type { ProductData } from "../../blockchain/interact";

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
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Track Product
      </h1>

      {/* Search Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product ID
        </label>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Enter Product ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "Track"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 font-medium mt-4">
            {error}
          </p>
        )}
      </div>

      {/* Product Details */}
      {product && (
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6 max-w-xl">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Product Details
          </h2>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>🆔 Product ID:</strong> {product.id}
            </p>

            <p>
              <strong>📦 Status:</strong>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-white text-xs ${getStatusColor(
                  product.status
                )}`}
              >
                {product.status}
              </span>
            </p>

            <p>
              <strong>👤 Current Owner:</strong>
              <br />
              <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded break-all inline-block mt-1">
                {product.owner}
              </span>
            </p>

            <p>
              <strong>📛 Product Name:</strong> {product.name}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

// Helper function (UNCHANGED)
const getStatusColor = (status: string) => {
  switch (status) {
    case "Registered":
      return "bg-blue-500";
    case "Distributed":
      return "bg-yellow-500";
    case "Retailing":
      return "bg-purple-500";
    case "Sold":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default TrackProduct;
