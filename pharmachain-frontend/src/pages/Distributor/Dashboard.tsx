import Layout from "../../components/Layout";

const DistributorDashboard = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Distributor Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold">📦 Accept & Forward Products</h3>
        <p className="text-gray-600 mt-2">
          Receive products and transfer to retailers.
        </p>
      </div>
    </Layout>
  );
};

export default DistributorDashboard;
