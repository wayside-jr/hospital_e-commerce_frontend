import axios from "axios";

const API = "https://hospital-e-commerce-backend.onrender.com";

export async function loginUser(
  email,
  password
) {
  const response = await axios.post(
    `${API}/auth/login`,
    {
      email,
      password,
    }
  );

  return response.data;
}


export async function registerUser(
  full_name,
  email,
  password
) {
  const response = await axios.post(
    `${API}/auth/register`,
    {
      full_name,
      email,
      password,
    }
  );

  return response.data;
}