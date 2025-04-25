import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../slice/brandSlice.jsx";
import { getAllCategories } from "../slice/categorySlice.jsx";
import { updateProduct } from "../slice/productSlice.jsx";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { products } = useSelector((state) => state.product);

  const dataForUpdate = products.find((prod) => prod._id === id) || {};
  const [imageFile, setImageFile] = useState(null);
  const [productData, setProductData] = useState({
    name: dataForUpdate.name || "",
    description: dataForUpdate.description || "",
    price: dataForUpdate.price || "",
    oldPrice: dataForUpdate.oldPrice || "",
    discount: dataForUpdate.discount || "",
    gender: dataForUpdate.gender || "",
    occasion: dataForUpdate.occasion || "",
    colors: dataForUpdate.color || [],
    categoryId: dataForUpdate.category?._id || "",
    brandId: dataForUpdate.brand?._id || "",
    imagePreview: dataForUpdate.image || "",
  });

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numeric = ["price", "oldPrice", "discount"];
    setProductData((prev) => ({
      ...prev,
      [name]: numeric.includes(name) ? parseFloat(value) || "" : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setProductData((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleColorChange = (e) => {
    const c = e.target.value;
    if (c && !productData.colors.includes(c)) {
      setProductData((prev) => ({ ...prev, colors: [...prev.colors, c] }));
    }
  };

  const removeColor = (c) => {
    setProductData((prev) => ({ ...prev, colors: prev.colors.filter((col) => col !== c) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile && !productData.imagePreview) {
      toast.error("Image is required");
      return;
    }
    const formData = new FormData();
    Object.entries(productData).forEach(([k, v]) => {
      if (k === "colors") {
        v.forEach((col) => formData.append("colors[]", col));
      } else if (k !== "imagePreview") {
        formData.append(k, v);
      }
    });
    if (imageFile) formData.append("image", imageFile);

    dispatch(updateProduct({ productId: id, updateData: formData })).then((res) => {
      if (res.type === "products/updateProduct/fulfilled") {
        toast.success("Product updated successfully",{
          duration: 3000, 
          position: 'top-right', 
        });
        navigate("/");
      } else if(res.type === "products/updateProduct/rejected") {
        toast.error("Failed to update product",{
          duration: 3000, 
          position: 'top-right', 
        });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24 px-12 py-10">
      <div className="p-6 mx-auto bg-white shadow-lg rounded-3xl ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="categoryId"
                value={productData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
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
                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['price', 'oldPrice', 'discount'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field === 'oldPrice' ? 'Old Price' : field}
                </label>
                <input
                  type="number"
                  name={field}
                  value={productData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Occasion</option>
                <option value="Party">Party</option>
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
                  className="w-10 h-10 p-0 border-none rounded cursor-pointer"
                />
                <div className="flex flex-wrap gap-2">
                  {productData.colors.map((col, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <div
                        className="w-5 h-5 rounded-full border"
                        style={{ backgroundColor: col }}
                      />
                      <button
                        type="button"
                        onClick={() => removeColor(col)}
                        className="text-red-500 text-sm"
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
                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm"
              />
              {productData.imagePreview && (
                <div className="mt-2">
                  <img
                    src={productData.imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
