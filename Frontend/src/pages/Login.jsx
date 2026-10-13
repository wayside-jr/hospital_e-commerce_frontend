import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  AlertCircle,
  LoaderCircle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Prevent duplicate login requests.
    if (loading) return;

    setError("");

    const trimmedEmail = email.trim();

    // Friendly client-side validation.
    if (!trimmedEmail || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(trimmedEmail, password);

      // Make sure the backend returned a usable token and user.
      if (!data?.access_token || !data?.user) {
        throw new Error("INVALID_LOGIN_RESPONSE");
      }

      // Save JWT token.
      localStorage.setItem("token", data.access_token);

      // Save logged-in user, including their role.
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Welcome back!", {
        description: "You have logged in successfully.",
      });

      // Keep the existing redirect.
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      // Remove partial authentication data if saving failed.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const status = err.response?.status;
      const serverMessage = err.response?.data?.error;

      let message;

      if (err.message === "INVALID_LOGIN_RESPONSE") {
        message =
          "We couldn't complete your login. Please try again.";
      } else if (!err.response && err.request) {
        message =
          "We couldn't connect to the server. Check your internet connection and try again.";
      } else if (status === 400 || status === 401) {
        // Your Flask backend returns 401 for incorrect credentials.
        message =
          "Incorrect email or password. Please check your details and try again.";
      } else if (status === 429) {
        message =
          "Too many attempts. Please wait a moment before trying again.";
      } else if (status >= 500) {
        message =
          "Our server is temporarily unavailable. Please try again shortly.";
      } else if (status === 403) {
        message =
          "You don't have permission to complete this request.";
      } else if (!err.response && !err.request) {
        message =
          "Something went wrong. Please try again.";
      } else {
        // Use safe, expected backend validation messages.
        const allowedMessages = [
          "email and password are required",
          "Fields cannot be empty",
          "Request body must be JSON",
        ];

        message = allowedMessages.includes(serverMessage)
          ? serverMessage
          : "Login failed. Please try again.";
      }

      setError(message);
    } finally {
      // Always restore the button, whether login succeeds or fails.
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-8">
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
            <div
              role="alert"
              aria-live="polite"
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />

              <p className="text-sm text-red-800">
                {error}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
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
                name="email"
                autoComplete="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@example.com"
                aria-invalid={Boolean(error)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your password"
                  aria-invalid={Boolean(error)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-blue-600 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-12 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    className="w-5 h-5 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                disabled={loading}
                className="text-blue-600 font-medium hover:text-blue-700 disabled:opacity-50"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
