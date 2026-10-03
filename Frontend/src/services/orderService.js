import axios from "axios";

const API = "https://hospital-e-commerce-backend.onrender.com/orders";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ======================
// GET ALL ORDERS
// ======================
export async function getAllOrders() {
  const response = await axios.get(
    `${API}/all`,
    authHeader()
  );

  return response.data;
}

// ======================
// UPDATE ORDER STATUS
// ======================
export async function updateOrderStatus(
  orderId,
  status
) {
  const response = await axios.patch(
    `${API}/${orderId}/status`,
    {
      status
    },
    authHeader()
  );

  return response.data;
}