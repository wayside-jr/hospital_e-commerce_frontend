import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  AlertCircle,
  LoaderCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

import {
  registerUser,
  loginUser,
} from "../services/authService";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setError("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    // Validate the form before sending requests.
    if (!trimmedName || !trimmedEmail || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create the account.
      const data = await registerUser(
        trimmedName,
        trimmedEmail,
        password
      );

      if (!data) {
        throw new Error("INVALID_REGISTER_RESPONSE");
      }

      // 2. Automatically log in the new customer.
      const loginData = await loginUser(
        trimmedEmail,
        password
      );

      // 3. Check that authentication returned usable data.
      if (!loginData?.access_token || !loginData?.user) {
        throw new Error("INVALID_LOGIN_RESPONSE");
      }

      // 4. Save authentication data.
      localStorage.setItem("token", loginData.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify(loginData.user)
      );

      // 5. Show success and redirect.
      toast.success("Account created successfully!", {
        description: "Welcome to Jeremy Enterprises.",
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Registration error:", err);

      // Avoid leaving partial authentication data behind.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const status = err.response?.status;
      const serverMessage = err.response?.data?.error;

      let message;

      if (
        err.message === "INVALID_REGISTER_RESPONSE" ||
        err.message === "INVALID_LOGIN_RESPONSE"
      ) {
        message =
          "Your request could not be completed. Please try again.";
      } else if (!err.response && err.request) {
        message =
          "We couldn't connect to the server. Check your internet connection and try again.";
      } else if (status === 409) {
        message =
          "An account with this email may already exist. Try logging in instead.";
      } else if (status === 400) {
        // Map known registration validation errors to friendly messages.
        const lowerMessage =
          typeof serverMessage === "string"
            ? serverMessage.toLowerCase()
            : "";

        if (
          lowerMessage.includes("email") &&
          (
            lowerMessage.includes("already") ||
            lowerMessage.includes("exist") ||
            lowerMessage.includes("registered") ||
            lowerMessage.includes("duplicate")
          )
        ) {
          message =
            "An account with this email already exists. Please log in instead.";
        } else if (
          lowerMessage.includes("password") &&
          lowerMessage.includes("short")
        ) {
          message =
            "Your password is too short. Please choose a longer password.";
        } else if (
          lowerMessage.includes("required") ||
          lowerMessage.includes("empty")
        ) {
          message =
            "Please fill in all required fields correctly.";
        } else {
          message =
            "We couldn't create your account with those details. Please check them and try again.";
        }
      } else if (status === 401) {
        message =
          "Your account was created, but automatic login failed. Please try logging in.";
      } else if (status === 429) {
        message =
          "Too many attempts. Please wait a moment before trying again.";
      } else if (status >= 500) {
        message =
          "Our server is temporarily unavailable. Please try again shortly.";
      } else {
        message =
          "Registration failed. Please try again.";
      }

      setError(message);
    } finally {
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
            Create Account
          </h1>

          <p className="text-gray-600">
            Create an account to get started
          </p>
        </div>

        {/* Registration Card */}
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

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>

              <input
                type="text"
                id="fullName"
                name="full_name"
                autoComplete="name"
                required
                disabled={loading}
                maxLength={120}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError("");
                }}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              />
            </div>

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
                  autoComplete="new-password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
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

              <p className="mt-2 text-xs text-gray-500">
                Choose a password that is difficult for others to guess.
              </p>
            </div>

            {/* Create Account Button */}
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
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/login")}
                disabled={loading}
                className="text-blue-600 font-medium hover:text-blue-700 disabled:opacity-50"
              >
                Login
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

export default Register;
