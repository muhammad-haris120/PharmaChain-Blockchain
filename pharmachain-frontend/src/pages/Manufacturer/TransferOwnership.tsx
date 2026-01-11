import { useState } from "react";
import {
  transferOwnership,
  getPharmaChainContract,
} from "../../blockchain/interact";
import { isAddress } from "ethers";
import Layout from "../../components/Layout";
import Button from "../../components/Button";

const TransferOwnership = () => {
  const [productId, setProductId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentOwner, setCurrentOwner] = useState<string | null>(null);

  // 👇 UNCHANGED LOGIC
  const checkOwner = async () => {
    if (!productId) return;
    try {
      const contract = await getPharmaChainContract();
      const product = await contract.products(productId);
      setCurrentOwner(product.owner);
      alert(`Product ${productId} is owned by:\n${product.owner}`);
    } catch (e) {
      console.error(e);
      alert("Product not found");
    }
  };

  // 👇 UNCHANGED LOGIC
  const handleTransfer = async () => {
    if (!productId || !newOwner) {
      alert("All fields are required");
      return;
    }
    if (!isAddress(newOwner)) {
      alert("Invalid Ethereum address!");
      return;
    }

    try {
      setLoading(true);
      await transferOwnership(Number(productId), newOwner);
      alert("Ownership transferred successfully!");
      setProductId("");
      setNewOwner("");
      setCurrentOwner(null);
    } catch (error: any) {
      console.error(error);
      if (error.reason) {
        alert(`Failed: ${error.reason}`);
      } else {
        alert("Transfer failed. See console.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Transfer Product Ownership
      </h1>

      {/* Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl space-y-4">
        {/* Product ID + Check Owner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product ID
          </label>

          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={checkOwner}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Check Owner
            </button>
          </div>
        </div>

        {/* Current Owner Display */}
        {currentOwner && (
          <div className="bg-gray-100 border rounded-lg p-3 text-sm text-gray-700 break-all">
            <strong>Current Owner:</strong>
            <br />
            <span className="font-mono text-xs">{currentOwner}</span>
          </div>
        )}

        {/* New Owner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Owner Address
          </label>

          <input
            type="text"
            placeholder="0x..."
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Transfer Button */}
        <Button
          label={loading ? "Transferring..." : "Transfer Ownership"}
          onClick={handleTransfer}
          disabled={loading}
          variant="primary"
        />
      </div>
    </Layout>
  );
};

export default TransferOwnership;
