import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);

      // Save JWT token
      localStorage.setItem(
        "token",
        data.access_token
      );

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.error ||
        "Login failed. Please check your email and password."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">

            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>

            <span className="text-2xl font-bold text-gray-900">
              Jeremy Enterprises
            </span>

          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Login
          </h1>

          <p className="text-gray-600">
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">

              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />

              <p className="text-sm text-red-800">
                {error}
              </p>

            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>

          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Create an account
              </button>
            </p>
          </div>

        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Website
          </a>
        </div>

      </div>
    </div>
  );
}

export default Login;