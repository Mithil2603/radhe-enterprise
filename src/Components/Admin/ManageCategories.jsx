import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/categories", {
        category_name: categoryName,
        category_description: categoryDescription,
        category_img: categoryImg,
      });
      toast.success("Category added successfully.");
      setCategoryName("");
      setCategoryDescription("");
      setCategoryImg([]);
      fetchCategories();
    } catch (error) {
      toast.error("Failed to add category.");
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryName(category.category_name);
    setCategoryDescription(category.category_description);
    setCategoryImg(category.category_img || []); // Ensure it's an array
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    try {
      await axios.put(
        `http://localhost:8080/categories/${editingCategory.category_id}`,
        {
          category_name: categoryName,
          category_description: categoryDescription,
          category_img: categoryImg,
        }
      );
      toast.success("Category updated successfully.");
      resetForm();
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update category.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:8080/categories/${categoryId}`);
        toast.success("Category deleted successfully.");
        fetchCategories();
      } catch (error) {
        toast.error("Failed to delete category.");
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
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <h1 className="text-center pb-4">Manage Categories</h1>
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
          <table className="table table-bordered table-hover">
            <thead className="bg-dark text-white">
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Images</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
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
                    <td>{category.created_at}</td>
                    <td>{category.update_at}</td>
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
