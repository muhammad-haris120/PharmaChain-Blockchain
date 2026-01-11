import Layout from "../../components/Layout";
import Button from "../../components/Button";

const AcceptProduct = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Accept Product
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md">
        <p className="text-gray-600 mb-4">
          Accept ownership from manufacturer.
        </p>

        <Button label="Accept Product" />
      </div>
    </Layout>
  );
};

export default AcceptProduct;
