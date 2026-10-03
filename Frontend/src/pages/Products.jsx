import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get(
        "https://hospital-e-commerce-backend.onrender.com/products/"
      );

      setProducts(response.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Medical Products
          </h1>

          <p className="text-gray-600">
            Browse our catalog of medical supplies
            and healthcare products.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={
                selectedCategory === category
                  ? "px-4 py-2 bg-blue-600 text-white rounded-lg"
                  : "px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          {filteredProducts.length} product
          {filteredProducts.length !== 1
            ? "s"
            : ""}{" "}
          found
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              No products found.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Products;