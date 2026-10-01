import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Package,
  ShoppingBag,
  Plus,
  RefreshCw,
} from "lucide-react";

import StatsCard from "../components/admin/StatsCard";
import ProductsTable from "../components/admin/ProductsTable";
import OrderTable from "../components/admin/OrderTable";
import ProductModal from "../components/admin/ProductModal";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orderService";


function AdminDashboard() {

  const navigate = useNavigate();


  // ==========================
  // STATE
  // ==========================

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState("products");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);


  // ==========================
  // FETCH PRODUCTS
  // ==========================

  async function fetchProducts() {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

      alert("Unable to load products.");

    }
  }


  // ==========================
  // FETCH ORDERS
  // ==========================

  async function fetchOrders() {

    try {

      const data = await getAllOrders();

      setOrders(data);

    } catch (error) {

      console.error(error);

      alert("Unable to load orders.");

    }
  }


  // ==========================
  // INITIAL LOAD
  // ==========================

  async function loadDashboard() {

    setLoading(true);

    try {

      await Promise.all([
        fetchProducts(),
        fetchOrders(),
      ]);

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {

    loadDashboard();

  }, []);


  // ==========================
  // ADD PRODUCT
  // ==========================

  async function handleAddProduct(productData) {

    try {

      await createProduct(productData);

      await fetchProducts();

      setModalOpen(false);

      alert("Product added successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to create product.");

    }
  }


  // ==========================
  // EDIT PRODUCT
  // ==========================

  async function handleEditProduct(productData) {

    try {

      await updateProduct(
        selectedProduct.id,
        productData
      );

      await fetchProducts();

      setSelectedProduct(null);

      setModalOpen(false);

      alert("Product updated.");

    } catch (error) {

      console.error(error);

      alert("Unable to update product.");

    }
  }


  // ==========================
  // DELETE PRODUCT
  // ==========================

  async function handleDeleteProduct(id) {

    const confirmed =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmed) return;

    try {

      await deleteProduct(id);

      await fetchProducts();

      alert("Product deleted.");

    } catch (error) {

      console.error(error);

      alert("Unable to delete.");

    }
  }


  // ==========================
  // UPDATE ORDER STATUS
  // ==========================

  async function handleStatusChange(
    orderId,
    status
  ) {

    try {

      await updateOrderStatus(
        orderId,
        status
      );

      await fetchOrders();

    } catch (error) {

      console.error(error);

      alert("Unable to update order.");

    }
  }


  // ==========================
  // OPEN ADD MODAL
  // ==========================

  function openAddModal() {

    setSelectedProduct(null);

    setModalOpen(true);

  }


  // ==========================
  // OPEN EDIT MODAL
  // ==========================

  function openEditModal(product) {

    setSelectedProduct(product);

    setModalOpen(true);

  }


  // ==========================
  // DASHBOARD STATS
  // ==========================

  const totalProducts =
    products.length;

  const totalOrders =
    orders.length;


  const totalStock = useMemo(() => {

    return products.reduce(
      (sum, product) =>
        sum + Number(product.stock || 0),
      0
    );

  }, [products]);


  const totalRevenue = useMemo(() => {

    return orders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.total_amount || 0
        ),
      0
    );

  }, [orders]);


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">

          <div className="animate-spin mx-auto mb-4">

            <RefreshCw
              size={40}
              className="text-blue-600"
            />

          </div>

          <p className="text-gray-600">
            Loading admin dashboard...
          </p>

        </div>

      </div>
    );

  }


  // ==========================
  // DASHBOARD
  // ==========================

  return (
    <div className="min-h-screen bg-gray-50">


      {/* ==========================
          HEADER
      ========================== */}

      <div className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-4 py-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


            {/* Dashboard Title */}

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your products and orders.
              </p>

            </div>


            {/* Right Side Buttons */}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">


              {/* Back to Home */}

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-200 transition"
              >
                ← Back to Home
              </button>


              {/* Add Product */}

              <button
                type="button"
                onClick={openAddModal}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={20} />
                Add Product
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================
          MAIN CONTENT
      ========================== */}

      <main className="max-w-7xl mx-auto px-4 py-8">


        {/* ==========================
            STATS
        ========================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <StatsCard
            title="Total Products"
            value={totalProducts}
            type="products"
          />

          <StatsCard
            title="Total Orders"
            value={totalOrders}
            type="orders"
          />

          <StatsCard
            title="Total Stock"
            value={totalStock}
            type="stock"
          />

          <StatsCard
            title="Total Revenue"
            value={`KSh ${totalRevenue.toLocaleString()}`}
            type="revenue"
          />

        </div>


        {/* ==========================
            TABS
        ========================== */}

        <div className="bg-white rounded-xl shadow-md mb-6">

          <div className="flex border-b">

            <button
              type="button"
              onClick={() =>
                setActiveTab("products")
              }
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === "products"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Package size={20} />
              Products
            </button>


            <button
              type="button"
              onClick={() =>
                setActiveTab("orders")
              }
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === "orders"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <ShoppingBag size={20} />
              Orders
            </button>

          </div>

        </div>


        {/* ==========================
            PRODUCTS
        ========================== */}

        {activeTab === "products" && (

          <div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  Products
                </h2>

                <p className="text-gray-500 text-sm">
                  Manage products in your store.
                </p>

              </div>


              <button
                type="button"
                onClick={openAddModal}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={18} />
                Add Product
              </button>

            </div>


            <ProductsTable
              products={products}
              onEdit={openEditModal}
              onDelete={handleDeleteProduct}
            />

          </div>

        )}


        {/* ==========================
            ORDERS
        ========================== */}

        {activeTab === "orders" && (

          <div>

            <div className="mb-4">

              <h2 className="text-xl font-bold text-gray-800">
                Orders
              </h2>

              <p className="text-gray-500 text-sm">
                View and manage customer orders.
              </p>

            </div>


            <OrderTable
              orders={orders}
              onStatusChange={
                handleStatusChange
              }
            />

          </div>

        )}

      </main>


      {/* ==========================
          PRODUCT MODAL
      ========================== */}

      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={
          selectedProduct
            ? handleEditProduct
            : handleAddProduct
        }
        product={selectedProduct}
      />

    </div>
  );
}

export default AdminDashboard;

