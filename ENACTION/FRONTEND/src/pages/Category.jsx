import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getAllCategories, updateCategory } from '../slice/categorySlice.jsx';
import toast from 'react-hot-toast';

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  console.log("XXX" , categories);

  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === '') return;

    dispatch(addCategory({ name: categoryName })).then((result) => {
      console.log(result);
      if (result.type === 'category/addCategory/fulfilled') {
        toast.success('Category Added', {
          duration: 3000, 
          position: 'top-right', 
        });
        setCategoryName('');
      }else if(result.type === "category/addCategory/rejected"){
        toast.error('Error ', {
          duration: 3000, // Display for 3 seconds
          position: 'top-right', // Position the toast
        });
      }
    });
  };

  const handleDeleteCategory = (id) => {
    setDeleteCategoryId(id);
    setIsModalOpen(true);
  };

  const confirmDeleteCategory = () => {
    dispatch(deleteCategory(deleteCategoryId)).then((result) => {
      console.log(result)
      if(result.type === "category/deleteCategory/fulfilled"){
        toast.success('Deleted', {
          duration: 3000, 
          position: 'top-right', 
        });
      }else if(result.type === "category/deleteCategory/rejected"){
        toast.error('Error ', {
          duration: 3000, // Display for 3 seconds
          position: 'top-right', // Position the toast
        });
      }
      setIsModalOpen(false);
    });
  };

  const handleEditCategory = (category) => {
    setEditingCategoryId(category._id);
    setEditingCategoryName(category.name);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (editingCategoryName.trim() === '') return;

    dispatch(updateCategory({ id: editingCategoryId, name: editingCategoryName })).then(
      (result) => {
        console.log(result)
        if(result.type === "category/updateCategory/fulfilled"){
          toast.success('Success message', {
            duration: 3000, // Display for 3 seconds
            position: 'top-right', // Position the toast
          });
        }else if(result.type === "category/updateCategory/rejected"){
          toast.error('Error ', {
            duration: 3000, // Display for 3 seconds
            position: 'top-right', // Position the toast
          });
        }
      }
    );
    setEditingCategoryId(null);
    setEditingCategoryName('');
  };

  return (
    <div className="mx-auto px-12 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div className="bg-white p-6 rounded-lg shadow-md h-[200px] border-2 border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Brand Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
            >
              Add Category
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Category Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cate) => (
              <div
                key={cate._id}
                className="w-full bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300 hover:shadow-2xl transition duration-300"
              >
                {editingCategoryId === cate._id ? (
                  <form onSubmit={handleUpdateCategory}>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                      value={editingCategoryName}
                      onChange={(e) => setEditingCategoryName(e.target.value)}
                      required
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
                        onClick={() => setEditingCategoryId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-2">{cate.name}</h3>
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 border border-blue-600 px-4 py-2 rounded-md"
                        onClick={() => handleEditCategory(cate)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 border border-red-600 px-4 py-2 rounded-md"
                        onClick={() => handleDeleteCategory(cate._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {categories.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No category added yet.
              </div>
            )}
          </div>
        </div>
      </div>

   
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this category?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                onClick={confirmDeleteCategory}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
