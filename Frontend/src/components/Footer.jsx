import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-50 border-t border-blue-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Company */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Jeremy Enterprises
            </h3>

            <p className="text-gray-600">
              Trusted supplier of quality medical
              equipment and healthcare products for
              hospitals, clinics, pharmacies, and
              healthcare professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Contact
            </h3>

            <p className="text-gray-600">
              Email: info@jeremyenterprises.com
            </p>

            <p className="text-gray-600">
              Phone: +254 722 821 988
            </p>

            <p className="text-gray-600">
              Nairobi, Kenya
            </p>
          </div>

        </div>

        <div className="border-t border-blue-100 mt-8 pt-6 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Jeremy Enterprises.
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;