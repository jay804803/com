import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../slice/productSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TableWithPagination = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headerData = [
    "no",
    "name",
    "description",
    "gender",
    "price",
    "discount",
    "occasion",
    "color",
    "category",
    "brand",
    "action",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const rowsPerPage = 3;
  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = products.slice(indexOfFirstRow, indexOfLastRow);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(productToDelete._id)).then((resolt)=>{
      console.log(resolt);
      if(resolt.type === "products/deleteProduct/fulfilled"){
        toast.success('Deleted', {
          duration: 3000, 
          position: 'top-right', 
        });
      }else if(resolt.type === "products/deleteProduct/rejected"){
        toast.error('Error ', {
          duration: 3000,
          position: 'top-right', 
        });
      }
    });
    setIsModalOpen(false);
    document.body.style.filter = "none";
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    document.body.style.filter = "none";
  };

  const handleUpdateClick = (product) => {
    navigate(`/updateProduct/${product._id}`);
  };

  return (
    <div className="relative border-2 border-gray-300 shadow-sm flex rounded-xl flex-col items-center justify-center w-full h-full px-6">
      <div className="overflow-auto w-full h-full">
        <p className="pt-4 text-xl text-gray-800 font-semibold">Product List</p>
        <table className="min-w-full table-fixed border-separate border-spacing-y-3">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
            <tr>
              {headerData.map((header, index) => (
                <th
                  key={index}
                  className={`px-4 py-2 text-left ${header === "no" ? "w-[6%]" : header === "description" ? "w-2/12" : "w-1/12"}`}
                >
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((product, rowIndex) => (
              <tr key={rowIndex} className="bg-white hover:bg-gray-50 rounded-lg">
                {headerData.map((header, cellIndex) => {
                  let productValue = product[header] || "N/A";
                  if (header === "no") {
                    productValue = indexOfFirstRow + rowIndex + 1;
                  } else if (header === "category" && product.category) {
                    productValue = product.category.name;
                  } else if (header === "brand" && product.brand) {
                    productValue = product.brand.name;
                  } else if (header === "description") {
                    productValue = <div className="truncate max-w-[300px]">{product.description || "N/A"}</div>;
                  } else if (header === "color") {
                    productValue = (
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(product.color) &&
                          product.color.map((clr, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 border border-black rounded"
                              style={{ backgroundColor: clr }}
                            ></div>
                          ))}
                      </div>
                    );
                  } else if (header === "name") {
                    productValue = (
                      <div className="flex items-center space-x-2">
                        <img
                          src={`http://localhost:3000/${product.image}`}
                          alt={product.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span>{product.name}</span>
                      </div>
                    );
                  } else if (header === "price") {
                    productValue = (
                      <div className="flex flex-col">
                        {product.oldPrice && <span className="text-sm text-gray-500 line-through">₹{product.oldPrice}</span>}
                        <span className="text-black font-semibold">₹{product.price}</span>
                      </div>
                    );
                  } else if (header === "action") {
                    productValue = (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateClick(product)}
                          className="px-4 py-2 text-blue-600 rounded-lg border border-blue-600  transition duration-300"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="px-4 py-2 text-red-600 border rounded-lg border-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    );
                  }
                  return (
                    <td
                      key={cellIndex}
                      className={`px-4 py-2 font-light ${header === "description" ? "w-2/12" : header === "no" ? "w-[6%]" : "w-1/12"}`}
                    >
                      {productValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center space-x-4 bg-white p-4 border-t border-gray-300">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-200 disabled:opacity-50 transition duration-200"
        >
          Previous
        </button>
        <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-200 disabled:opacity-50 transition duration-200"
        >
          Next
        </button>
      </div>

     
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCancelDelete}
          contentLabel="Confirm Deletion"
          overlayClassName="fixed inset-0 bg-opacity-50 backdrop-blur-md"
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete the product{" "}
              <strong className="text-black">{productToDelete?.name}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2  text-gray-800 rounded-lg  transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2  text-black bg-red-900 rounded-lgbg-red-900 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TableWithPagination;
