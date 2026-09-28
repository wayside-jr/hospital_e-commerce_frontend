import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        border-gray-200
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        transition-shadow
      "
    >
      {/* Product Image */}
      <div className="h-64 bg-gray-100">
        <img
        src={product.image_url || "https://placehold.co/600x600"}
        alt={product.name}
        onError={(e) => {
            e.target.src = "https://placehold.co/600x600";
        }}
        className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        <p className="text-sm text-blue-600 font-medium">
          {product.category}
        </p>

        <h3 className="text-lg font-bold text-gray-900 mt-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            KSh {product.price}
          </span>

        <Link
        to={`/products/${product.id}`}
        className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-blue-700
        "
        >
        View
        </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;