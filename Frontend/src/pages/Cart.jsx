import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart
} from "lucide-react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {

  // =========================
  // STATE
  // =========================

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [removingItem, setRemovingItem] =
    useState(null);


  // =========================
  // FETCH CART
  // =========================

  useEffect(() => {
    fetchCart();
  }, []);


  async function fetchCart() {

    try {

      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://127.0.0.1:5000/cart/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      setItems(response.data.items || []);
      setTotal(response.data.total || 0);

    } catch (error) {

      console.error(error);

      if (error.response?.status === 401) {
        setError("Please login to view your cart.");
      } else {
        setError(
          error.response?.data?.message ||
          "Failed to load your cart."
        );
      }

    } finally {

      setLoading(false);

    }
  }


  // =========================
  // REMOVE ITEM
  // =========================

  async function removeFromCart(cartItemId) {

    try {

      setRemovingItem(cartItemId);

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://127.0.0.1:5000/cart/item/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Refresh cart from database
      await fetchCart();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to remove item."
      );

    } finally {

      setRemovingItem(null);

    }
  }


  // =========================
  // INCREASE QUANTITY
  // =========================

  async function increaseQuantity(item) {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:5000/cart/add",
        {
          product_id: item.product_id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      await fetchCart();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update quantity."
      );
    }
  }


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="min-h-screen bg-gray-50">

        <Navbar />

        <div className="min-h-[70vh] flex items-center justify-center">

          <div className="text-gray-500">
            Loading your cart...
          </div>

        </div>

        <Footer />

      </div>
    );
  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <div className="min-h-screen bg-gray-50">

        <Navbar />

        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">

          <ShoppingCart
            className="w-16 h-16 text-gray-300"
          />

          <h2 className="text-2xl font-bold text-gray-900">
            {error}
          </h2>

          <Link
            to="/products"
            className="
              px-6
              py-3
              bg-blue-600
              text-white
              rounded-lg
              hover:bg-blue-700
              transition-colors
            "
          >
            Browse Products
          </Link>

        </div>

        <Footer />

      </div>
    );
  }


  // =========================
  // EMPTY CART
  // =========================

  if (items.length === 0) {

    return (
      <div className="min-h-screen bg-gray-50">

        <Navbar />

        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">

          <ShoppingCart
            className="w-16 h-16 text-gray-300"
          />

          <h2 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>

          <p className="text-gray-500 text-center">
            Add some products to get started.
          </p>

          <Link
            to="/products"
            className="
              mt-2
              px-6
              py-3
              bg-blue-600
              text-white
              rounded-lg
              hover:bg-blue-700
              transition-colors
            "
          >
            Browse Products
          </Link>

        </div>

        <Footer />

      </div>
    );
  }


  // =========================
  // CART PAGE
  // =========================

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* =========================
            HEADER
        ========================= */}

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            Your Cart
          </h1>

          <span className="text-sm text-gray-500">
            {items.length}{" "}
            {items.length === 1 ? "item" : "items"}
          </span>

        </div>


        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          {/* =========================
              CART ITEMS
          ========================= */}

          <div className="lg:col-span-2 space-y-4">

            {items.map((item) => (

              <div
                key={item.cart_item_id}
                className="
                  bg-white
                  rounded-lg
                  border
                  border-gray-200
                  p-4
                  flex
                  gap-4
                "
              >

                {/* PRODUCT IMAGE */}

                <div className="
                  w-24
                  h-24
                  flex-shrink-0
                  rounded-lg
                  overflow-hidden
                  bg-gray-100
                ">

                  <img
                    src={
                      item.image_url ||
                      "https://placehold.co/200x200"
                    }
                    alt={item.product_name}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="flex-1 min-w-0">

                  {item.category && (
                    <div className="
                      text-xs
                      text-blue-600
                      font-medium
                      mb-1
                    ">
                      {item.category}
                    </div>
                  )}

                  <h3 className="
                    font-semibold
                    text-gray-900
                    mb-1
                    line-clamp-2
                  ">
                    {item.product_name}
                  </h3>


                  <p className="
                    text-lg
                    font-bold
                    text-gray-900
                  ">
                    KSh{" "}
                    {Number(item.subtotal).toLocaleString()}
                  </p>


                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    KSh{" "}
                    {Number(item.price).toLocaleString()}
                    {" "}each
                  </p>

                </div>


                {/* RIGHT SIDE */}

                <div className="
                  flex
                  flex-col
                  items-end
                  justify-between
                ">


                  {/* REMOVE */}

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.cart_item_id
                      )
                    }
                    disabled={
                      removingItem ===
                      item.cart_item_id
                    }
                    className="
                      text-gray-400
                      hover:text-red-500
                      transition-colors
                      disabled:opacity-50
                    "
                  >

                    <Trash2 className="w-4 h-4" />

                  </button>


                  {/* QUANTITY */}

                  <div className="
                    flex
                    items-center
                    gap-2
                    border
                    border-gray-200
                    rounded-lg
                    px-2
                    py-1
                  ">

                    <button
                      disabled
                      className="
                        text-gray-300
                        cursor-not-allowed
                      "
                      title="Quantity decrease will be added with the backend update route"
                    >
                      <Minus className="w-4 h-4" />
                    </button>


                    <span className="
                      w-6
                      text-center
                      text-sm
                      font-medium
                    ">
                      {item.quantity}
                    </span>


                    <button
                      onClick={() =>
                        increaseQuantity(item)
                      }
                      className="
                        text-gray-500
                        hover:text-gray-900
                        transition-colors
                      "
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div className="lg:col-span-1">

            <div className="
              bg-white
              rounded-lg
              border
              border-gray-200
              p-6
              sticky
              top-24
            ">

              <h2 className="
                text-lg
                font-bold
                text-gray-900
                mb-4
              ">
                Order Summary
              </h2>


              <div className="space-y-2 mb-4">

                <div className="
                  flex
                  justify-between
                  text-sm
                  text-gray-600
                ">

                  <span>
                    Items ({items.length})
                  </span>

                  <span>
                    KSh{" "}
                    {Number(total).toLocaleString()}
                  </span>

                </div>

              </div>


              <div className="
                border-t
                border-gray-200
                pt-4
                mb-6
              ">

                <div className="
                  flex
                  justify-between
                  font-bold
                  text-gray-900
                ">

                  <span>
                    Total
                  </span>

                  <span>
                    KSh{" "}
                    {Number(total).toLocaleString()}
                  </span>

                </div>

              </div>


              {/* CHECKOUT */}

              <Link
                to="/checkout"
                className="
                  block
                  w-full
                  py-3
                  bg-blue-600
                  text-white
                  text-center
                  rounded-lg
                  hover:bg-blue-700
                  transition-colors
                  font-medium
                "
              >
                Proceed to Checkout
              </Link>


              {/* CONTINUE SHOPPING */}

              <Link
                to="/products"
                className="
                  block
                  w-full
                  py-3
                  text-blue-600
                  text-center
                  rounded-lg
                  hover:bg-blue-50
                  transition-colors
                  text-sm
                  mt-2
                "
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Cart;
