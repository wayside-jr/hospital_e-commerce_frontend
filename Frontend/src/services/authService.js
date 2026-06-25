import axios from "axios";

const API = "http://127.0.0.1:5000";

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