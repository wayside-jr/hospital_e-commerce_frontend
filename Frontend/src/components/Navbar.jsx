import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Jeremy Enterprises
        </Link>

        <div className="flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-blue-600"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="hover:text-blue-600"
          >
            Cart
          </Link>

          <Link
            to="/orders"
            className="hover:text-blue-600"
          >
            Orders
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Register
              </Link>
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