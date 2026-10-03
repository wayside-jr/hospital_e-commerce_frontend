import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [addingToCart, setAddingToCart] =
    useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      const response =
        await axios.get(
          `https://hospital-e-commerce-backend.onrender.com/products/${id}`
        );

      setProduct(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addToCart() {
    try {
      setAddingToCart(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axios.post(
          "https://hospital-e-commerce-backend.onrender.com/cart/add",
          {
            product_id: product.id,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(response.data);

      alert("Product added to cart!");

    } catch (error) {
      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "DATA:",
        error.response?.data
      );

      console.error(
        "HEADERS:",
        error.response?.headers
      );

      alert(
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to add product to cart"
      );
    } finally {
      setAddingToCart(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="
            mb-8
            text-blue-600
            hover:text-blue-800
          "
        >
          ← Back
        </button>

        <div
          className="
            bg-white
            rounded-xl
            shadow-sm
            border
            border-gray-200
            overflow-hidden
          "
        >

          <div
            className="
              grid
              md:grid-cols-2
              gap-10
              p-8
            "
          >

            {/* ==========================
                PRODUCT IMAGE
            ========================== */}

            <div className="flex items-start justify-center">

              <img
                src={
                  product.image_url ||
                  "https://placehold.co/600x600?text=No+Image"
                }
                alt={product.name}
                className="
                  w-full
                  h-auto
                  max-w-full
                  rounded-xl
                  object-contain
                "
              />

            </div>

            {/* ==========================
                PRODUCT DETAILS
            ========================== */}

            <div>

              <span
                className="
                  inline-block
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  mb-4
                "
              >
                {product.category}
              </span>

              <h1
                className="
                  text-4xl
                  font-bold
                  text-gray-900
                  mb-4
                "
              >
                {product.name}
              </h1>

              <p
                className="
                  text-3xl
                  font-bold
                  text-blue-600
                  mb-6
                "
              >
                KSh{" "}
                {Number(
                  product.price
                ).toLocaleString()}
              </p>

              {/* DESCRIPTION */}

              <div className="mb-6">

                <h2
                  className="
                    text-xl
                    font-semibold
                    mb-2
                  "
                >
                  Description
                </h2>

                <p className="text-gray-600">
                  {product.description}
                </p>

              </div>

              {/* PRODUCT INFORMATION */}

              <div className="mb-6">

                <h2
                  className="
                    text-xl
                    font-semibold
                    mb-2
                  "
                >
                  Product Information
                </h2>

                <div className="space-y-2">

                  <p>
                    <strong>Brand:</strong>{" "}
                    {product.brand || "-"}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {product.category || "-"}
                  </p>

                  <p>
                    <strong>Stock:</strong>{" "}
                    {product.stock}
                  </p>

                </div>

              </div>

              {/* ADD TO CART */}

              <button
                onClick={addToCart}
                disabled={
                  addingToCart ||
                  Number(product.stock) <= 0
                }
                className="
                  w-full
                  bg-blue-600
                  text-white
                  py-3
                  rounded-lg
                  hover:bg-blue-700
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                "
              >
                {addingToCart
                  ? "Adding..."
                  : Number(product.stock) <= 0
                  ? "Out of Stock"
                  : "Add To Cart"}
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default ProductDetails;