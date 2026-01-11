import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";

const TrackProduct = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Track Shipment
      </h1>

      <ProductCard
        id={1}
        name="Ibuprofen"
        owner="0x5678...efgh"
        status="IN_TRANSIT"
      />
    </Layout>
  );
};

export default TrackProduct;
