import Layout from "../../components/Layout";

const ManufacturerDashboard = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Manufacturer Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">➕ Register Product</h3>
          <p className="text-sm text-gray-600 mt-2">
            Add new pharmaceutical products to blockchain.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">🔁 Transfer Ownership</h3>
          <p className="text-sm text-gray-600 mt-2">
            Send products to distributors.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ManufacturerDashboard;
