import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">🔐 Product Authenticity</h3>
          <p className="text-gray-600">
            Ensure medicines are genuine using blockchain verification.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">📦 Supply Chain Tracking</h3>
          <p className="text-gray-600">
            Track products from manufacturer to retailer transparently.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">👤 Role Based Access</h3>
          <p className="text-gray-600">
            Only authorized roles can perform actions.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
