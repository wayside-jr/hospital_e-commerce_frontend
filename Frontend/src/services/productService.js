import axios from "axios";

const API = "http://127.0.0.1:5000/products";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ======================
// GET ALL PRODUCTS
// ======================
export async function getProducts() {
  const response = await axios.get(API);

  return response.data;
}

// ======================
// GET ONE PRODUCT
// ======================
export async function getProduct(id) {
  const response = await axios.get(`${API}/${id}`);

  return response.data;
}

// ======================
// CREATE PRODUCT
// ======================
export async function createProduct(productData) {
  const response = await axios.post(
    API,
    productData,
    authHeader()
  );

  return response.data;
}

// ======================
// UPDATE PRODUCT
// ======================
export async function updateProduct(
  id,
  productData
) {
  const response = await axios.put(
    `${API}/${id}`,
    productData,
    authHeader()
  );

  return response.data;
}

// ======================
// DELETE PRODUCT
// ======================
export async function deleteProduct(id) {
  const response = await axios.delete(
    `${API}/${id}`,
    authHeader()
  );

  return response.data;
}