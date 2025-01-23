import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImg, setCategoryImg] = useState([]); // Initialize as an array
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://machinery-backend-login-part.onrender.com/categories");
      setCategories(response.data);
    } catch (error) {
      alert("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const isDuplicateCategoryName = (name) => {
    return categories.some(
      (categories) =>
        categories.category_name === name &&
        categories.category_id !==
          (editingCategory ? editingCategory.product_id : null)
    );
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      alert("Category name cannot be empty.");
      return;
    }
    if (isDuplicateCategoryName(categoryName)) {
      alert("Category name already exists!");
      return;
    }

    try {
      await axios.post("https://machinery-backend-login-part.onrender.com/categories", {
        category_name: categoryName,
        category_description: categoryDescription,
        category_img: categoryImg,
      });
      alert("Category added successfully.");
      setCategoryName("");
      setCategoryDescription("");
      setCategoryImg([]);
      fetchCategories();
    } catch (error) {
      alert("Failed to add category.");
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryName(category.category_name);
    setCategoryDescription(category.category_description);
    setCategoryImg(category.category_img || []); // Ensure it's an array

    // Show alert to inform the user that edit mode is on
    alert("Edit Product Mode On");
    window.scrollTo(0, 0);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    try {
      await axios.put(
        `https://machinery-backend-login-part.onrender.com/categories/${editingCategory.category_id}`,
        {
          category_name: categoryName,
          category_description: categoryDescription,
          category_img: categoryImg,
        }
      );
      alert("Category updated successfully.");
      resetForm();
      fetchCategories();
    } catch (error) {
      alert("Failed to update category.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`https://machinery-backend-login-part.onrender.com/categories/${categoryId}`);
        alert("Category deleted successfully.");
        fetchCategories();
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Failed to delete category.");
        }
      }
    }
  };

  const handleAddImageField = () => {
    setCategoryImg([...categoryImg, ""]);
  };

  const handleRemoveImageField = (index) => {
    setCategoryImg(categoryImg.filter((_, i) => i !== index));
  };

  const handleImageChange = (index, value) => {
    const updatedImgs = [...categoryImg];
    updatedImgs[index] = value;
    setCategoryImg(updatedImgs);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryDescription("");
    setCategoryImg([]);

    alert("Edit Product Mode Off");
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-transparent p-3 rounded m-auto text-center">
        Manage Categories
      </h1>
      <div className="container pb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <textarea
          className="form-control my-2"
          placeholder="Enter category description"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
        <h5>Images</h5>
        {categoryImg.map((img, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter image URL"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveImageField(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="btn btn-primary mt-3 mx-2"
          onClick={handleAddImageField}
        >
          Add Image
        </button>
        {editingCategory ? (
          <>
            <button
              className="btn btn-primary mt-3 mx-2"
              onClick={handleUpdateCategory}
            >
              Update Category
            </button>
            <button className="btn btn-secondary mt-3 mx-2" onClick={resetForm}>
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-success mt-3 mx-2"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="container-fluid user-table w-100">
          <table className="table table-bordered table-hover table-striped rounded overflow-hidden">
            <thead className="bg-dark text-white">
              <tr>
                <th className="bg-dark text-white">Id</th>
                <th className="bg-dark text-white">Category Name</th>
                <th className="bg-dark text-white">Description</th>
                <th className="bg-dark text-white">Images</th>
                <th className="bg-dark text-white">Created At</th>
                <th className="bg-dark text-white">Updated At</th>
                <th className="bg-dark text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.category_id}>
                    <td>{category.category_id}</td>
                    <td>{category.category_name}</td>
                    <td>{category.category_description}</td>
                    <td>
                      {category.category_img
                        ? category.category_img.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Category ${i}`}
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "5px",
                              }}
                            />
                          ))
                        : "No images"}
                    </td>
                    <td>
                      {format(
                        new Date(category.created_at),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(category.update_at),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDeleteCategory(category.category_id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
