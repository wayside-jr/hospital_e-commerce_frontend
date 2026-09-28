import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await loginUser(
        email,
        password
      );

      localStorage.setItem(
          "token",
          data.access_token
      );

      localStorage.setItem(
          "user",
          JSON.stringify(data.user)
      );

      alert("Login successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.error ||
        "Login failed"
      );
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;