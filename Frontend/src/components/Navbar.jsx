import {
  NavLink,
  useNavigate
} from "react-router-dom";

import { ShoppingCart } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "text-gray-700 hover:text-blue-600 transition-colors";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Jeremy Enterprises
        </NavLink>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">

          <NavLink
            to="/"
            end
            className={linkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={linkClass}
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 flex items-center gap-2"
                : "text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"
            }
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
          </NavLink>


          {/* Only Admins can see this */}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={linkClass}
            >
              Admin
            </NavLink>
          )}

          {!token ? (
            <>
              <NavLink
                to="/login"
                className={linkClass}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-blue-700
                  transition-colors
                "
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-red-600
                transition-colors
              "
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;