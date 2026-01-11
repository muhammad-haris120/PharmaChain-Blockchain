interface ProductCardProps {
  id: number;
  name: string;
  owner: string;
  status: string;
}

const ProductCard = ({ id, name, owner, status }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold mb-1">{name}</h3>

      <p className="text-sm text-gray-600">Product ID: {id}</p>
      <p className="text-sm text-gray-600 truncate">
        Owner: {owner}
      </p>

      <span className="inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
        {status}
      </span>
    </div>
  );
};

export default ProductCard;
