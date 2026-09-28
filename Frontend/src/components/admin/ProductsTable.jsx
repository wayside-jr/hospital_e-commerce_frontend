
import {
  Pencil,
  Trash2,
} from "lucide-react";

function ProductsTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Image
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Brand
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>

            ) : (

              products.map((product) => (

                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >

                  {/* IMAGE */}
                  <td className="px-6 py-4">
                    <img
                      src={
                        product.image_url ||
                        "https://placehold.co/70x70?text=No+Image"
                      }
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  </td>

                  {/* PRODUCT */}
                  <td className="px-6 py-4">
                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-4">
                    {product.category || "-"}
                  </td>

                  {/* BRAND */}
                  <td className="px-6 py-4">
                    {product.brand || "-"}
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 font-semibold">
                    KSh{" "}
                    {Number(product.price).toLocaleString()}
                  </td>

                  {/* STOCK */}
                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          onEdit(product)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                        title="Edit product"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(product.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                        title="Delete product"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            )}

          </tbody>
        </table>

      </div>
    </div>
  );
}

export default ProductsTable;

