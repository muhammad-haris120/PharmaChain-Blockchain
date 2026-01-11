import { useState } from "react";
import { usePharmaChain } from "../../hooks/usePharmaChain";
import Layout from "../../components/Layout";
import Button from "../../components/Button";

const SellProduct = () => {
  const { sell } = usePharmaChain();

  const [productId, setProductId] = useState("");
  const [buyer, setBuyer] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔒 LOGIC UNCHANGED
  const handleSell = async () => {
    setMessage("");
    setError("");

    try {
      const id = Number(productId);
      if (isNaN(id)) throw new Error("Invalid product ID");
      if (!buyer) throw new Error("Buyer address is required");

      await sell(Number(productId), buyer);

      setMessage("Product sold successfully!");
      setProductId("");
      setBuyer("");
    } catch (err: any) {
      setError(err.message || "Selling failed");
    }
  };

  return (
    <Layout>
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Sell Product
      </h1>

      {/* Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md space-y-4">
        {/* Product ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product ID
          </label>
          <input
            type="text"
            placeholder="Product ID (number)"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buyer Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buyer Address
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Sell Button */}
        <Button
          label="Sell Product"
          onClick={handleSell}
          variant="primary"
        />

        {/* Messages */}
        {message && (
          <p className="text-green-600 font-medium mt-2">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 font-medium mt-2">
            {error}
          </p>
        )}
      </div>
    </Layout>
  );
};

export default SellProduct;
