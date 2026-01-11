import Layout from "../../components/Layout";

const RetailerDashboard = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Retailer Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold">💰 Sell Product</h3>
        <p className="text-gray-600 mt-2">
          Sell products to customers securely.
        </p>
      </div>
    </Layout>
  );
};

export default RetailerDashboard;
