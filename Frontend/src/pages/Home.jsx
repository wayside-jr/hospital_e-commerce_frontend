import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
         <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">

          <div className="max-w-3xl mx-auto text-center">

            <h1 className="text-4xl md:text-5xl font-bold">
              Quality Medical Supplies You Can Trust
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Jeremy Enterprises provides premium medical equipment
              to clinics, hospitals, pharmacies and healthcare
              professionals.
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto mb-8"
            >
              <input
                type="text"
                placeholder="Search medical products..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />
            </form>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/products")}
                className="
                  bg-blue-600
                  text-white
                  px-8
                  py-3
                  rounded-lg
                  hover:bg-blue-700
                "
              >
                View Products
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="
                  border-2
                  border-blue-600
                  text-blue-600
                  px-8
                  py-3
                  rounded-lg
                  hover:bg-blue-50
                "
              >
                Contact Us
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center p-6">
              <h3 className="font-bold text-xl mb-2">
                Quality Assured
              </h3>

              <p className="text-gray-600">
                All products meet medical standards and certifications.
              </p>
            </div>

            <div className="text-center p-6">
              <h3 className="font-bold text-xl mb-2">
                Fast Delivery
              </h3>

              <p className="text-gray-600">
                Reliable delivery to hospitals, pharmacies and clinics.
              </p>
            </div>

            <div className="text-center p-6">
              <h3 className="font-bold text-xl mb-2">
                24/7 Support
              </h3>

              <p className="text-gray-600">
                Our support team is always available to assist.
              </p>
            </div>

          </div>

        </div>

      </section>
      <Footer/>

    </div>
  );
}

export default Home;