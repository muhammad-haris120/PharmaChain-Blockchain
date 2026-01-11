import { useState } from "react";
import { registerProduct } from "../../blockchain/interact";
import Layout from "../../components/Layout";
import Button from "../../components/Button";

const RegisterProduct = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name) {
      alert("Please enter product name");
      return;
    }

    try {
      setLoading(true);
      await registerProduct(name);
      alert("Product registered successfully!");
      setName("");
    } catch (error: any) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Register New Product
      </h1>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>

        <input
          type="text"
          placeholder="e.g. Paracetamol 500mg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          label={loading ? "Registering..." : "Register Product"}
          onClick={handleRegister}
          disabled={loading}
        />
      </div>
    </Layout>
  );
};

export default RegisterProduct;
