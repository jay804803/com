import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../slice/brandSlice.jsx";
import { getAllCategories } from "../slice/categorySlice.jsx";
import { createProduct } from "../slice/productSlice.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    discount: "",
    gender: "",
    occasion: "",
    colors: [],
    categoryId: "",
    brandId: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["price", "oldPrice", "discount"];
    setProductData((prevData) => ({
      ...prevData,
      [name]: numericFields.includes(name) ? parseFloat(value) || "" : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
      setImageFile(null);
      setImagePreview("");
    }
  };

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    if (selectedColor && !productData.colors.includes(selectedColor)) {
      setProductData((prevData) => ({
        ...prevData,
        colors: [...prevData.colors, selectedColor],
      }));
    }
  };

  const removeColor = (colorToRemove) => {
    setProductData((prevData) => ({
      ...prevData,
      colors: prevData.colors.filter((color) => color !== colorToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "colors") {
          productData.colors.forEach((color) => formData.append("colors", color));
        } else {
          formData.append(key, productData[key]);
        }
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }

      dispatch(createProduct(formData)).then((result) => {
        if (result.type === "products/createProduct/fulfilled") {
          setProductData({
            name: "",
            description: "",
            price: "",
            oldPrice: "",
            discount: "",
            gender: "",
            occasion: "",
            colors: [],
            categoryId: "",
            brandId: "",
          });
          setImageFile(null);
          setImagePreview("");
          toast.success("Product Added", { duration: 3000, position: "top-right" });
          navigate("/");
        } else if(result.type === "products/createProduct/rejected") {
          toast.error("Error", { duration: 3000, position: "top-right" });
        }
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white pt-24 px-12 ">
      <div className="mx-auto bg-white shadow-lg rounded-xl p-6 border-2 border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="categoryId"
                value={productData.categoryId}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <select
                name="brandId"
                value={productData.brandId}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["price", "oldPrice", "discount"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field === "oldPrice" ? "Old Price" : field}
                </label>
                <input
                  type="number"
                  name={field}
                  value={productData[field]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={productData.gender}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
              <select
                name="occasion"
                value={productData.occasion}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="">Select Occasion</option>
                <option value="party">Party</option>
                <option value="Casual">Casual</option>
                <option value="Sport">Sport</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  onChange={handleColorChange}
                  className="w-8 h-8 p-0 border-none cursor-pointer"
                />
                <div className="flex flex-wrap gap-2">
                  {productData.colors.map((color, index) => (
                    <div key={index} className="flex items-center">
                      <span
                        className="w-5 h-5 rounded-full border border-gray-400"
                        style={{ backgroundColor: color }}
                      ></span>
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="ml-1 text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-xl px-4 py-2 border border-gray-300 bg-white shadow-sm"
                required
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-6 rounded-xl shadow-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;