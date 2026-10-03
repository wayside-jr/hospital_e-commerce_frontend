import { useEffect, useState } from "react";
import {
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    image_url: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category || "",
        brand: product.brand || "",
        image_url: product.image_url || "",
      });

      setImagePreview(product.image_url || "");
      setImageFile(null);
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        image_url: "",
      });

      setImagePreview("");
      setImageFile(null);
    }
  }, [product, isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // If the user manually enters an image URL,
    // show it as the preview.
    if (name === "image_url") {
      setImagePreview(value);
      setImageFile(null);
    }
  }

  function handleImageFile(file) {
    if (!file) {
      return;
    }

    // Only allow image files
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Limit image size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    setImageFile(file);

    // Create a temporary preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // We keep image_url empty for now.
    // The actual upload will be handled by the backend/storage.
    setFormData((previous) => ({
      ...previous,
      image_url: "",
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];

    handleImageFile(file);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    handleImageFile(file);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");

    setFormData((previous) => ({
      ...previous,
      image_url: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),

        // The selected file is included so the parent
        // can upload it later.
        imageFile,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {product
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {product
                ? "Update the product information."
                : "Add a new product to your store."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          {/* PRICE + STOCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (KSh)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

          </div>

          {/* CATEGORY + BRAND */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Catheters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand"
              />
            </div>

          </div>

          {/* IMAGE */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>

            {/* DRAG AND DROP AREA */}
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="product-image-upload"
              />

              {imagePreview ? (

                <div className="space-y-4">

                  <div className="flex justify-center">

                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-40 h-40 object-cover rounded-xl border"
                      onError={() => {
                        setImagePreview("");
                      }}
                    />

                  </div>

                  {imageFile && (
                    <p className="text-sm text-gray-600">
                      {imageFile.name}
                    </p>
                  )}

                  <div className="flex justify-center gap-3">

                    <label
                      htmlFor="product-image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Upload size={18} />
                      Choose Another
                    </label>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ) : (

                <div className="space-y-3">

                  <div className="flex justify-center">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <ImageIcon
                        size={30}
                        className="text-gray-500"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 font-medium">
                    Drag & drop your image here
                  </p>

                  <p className="text-gray-500 text-sm">
                    or
                  </p>

                  <label
                    htmlFor="product-image-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Upload size={18} />
                    Choose from Computer
                  </label>

                  <p className="text-xs text-gray-400">
                    PNG, JPG, JPEG, WEBP • Maximum 5MB
                  </p>

                </div>

              )}

            </div>

            {/* IMAGE URL */}
            <div className="mt-4">

              <div className="flex items-center gap-2 mb-2">

                <div className="h-px bg-gray-200 flex-1"></div>

                <span className="text-xs text-gray-400">
                  OR USE IMAGE URL
                </span>

                <div className="h-px bg-gray-200 flex-1"></div>

              </div>

              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : product
                ? "Update Product"
                : "Add Product"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ProductModal;

