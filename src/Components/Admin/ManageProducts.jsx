import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState([""]);
  const [productImg, setProductImg] = useState([""]);
  const [categoryId, setCategoryId] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/products"
      );
      console.log("Fetched products from API:", response.data);
      setProducts(response.data);
    } catch (error) {
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      alert("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const isDuplicateProductName = (name) => {
    return products.some(
      (product) =>
        product.product_name === name &&
        product.product_id !==
          (editingProduct ? editingProduct.product_id : null)
    );
  };

  const handleAddProduct = async () => {
    if (!productName.trim() || !categoryId) {
      alert("Product name and category are required.");
      return;
    }

    if (isDuplicateProductName(productName)) {
      alert("Product name already exists.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/products", {
        category_id: categoryId,
        product_name: productName,
        product_description: productDescription,
        product_img: productImg,
      });
      alert("Product added successfully.");
      resetForm();
      fetchProducts();
    } catch (error) {
      alert("Failed to add product.");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductName(product.product_name);
    setProductDescription(product.product_description || []);
    setProductImg(product.product_img || []);
    setCategoryId(product.category_id);

    // Show alert to inform the user that edit mode is on
    alert("Edit Product Mode On");
    window.scrollTo(0, 0);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      await axios.put(
        `http://localhost:8080/products/${editingProduct.product_id}`,
        {
          category_id: categoryId,
          product_name: productName,
          product_description: JSON.stringify(productDescription), // Ensure it's a valid JSON string
          product_img: productImg,
        }
      );

      resetForm();
      fetchProducts();
    } catch (error) {
      alert("Failed to update product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.put(
          `http://localhost:8080/products/${productId}/soft-delete`
        );
        alert(response.data.message);
        fetchProducts();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message); // Show error message if there are orders
        } else {
          alert("Failed to soft delete product.");
        }
      }
    }
  };

  const handleAddDescriptionField = () => {
    setProductDescription([...productDescription, ""]);
  };

  const handleRemoveDescriptionField = (index) => {
    setProductDescription(productDescription.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...productDescription];
    updatedDescriptions[index] = value;
    setProductDescription(updatedDescriptions);
  };

  const handleAddImageField = () => {
    setProductImg([...productImg, ""]);
  };

  const handleRemoveImageField = (index) => {
    setProductImg(productImg.filter((_, i) => i !== index));
  };

  const handleImageChange = (index, value) => {
    const updatedImgs = [...productImg];
    updatedImgs[index] = value;
    setProductImg(updatedImgs);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setProductName("");
    setProductDescription([]);
    setProductImg([]);
    setCategoryId("");

    alert("Edit Product Mode Off");
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-transparent p-3 rounded m-auto text-center">
        Manage Products
      </h1>
      <div className="container pb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <h5 className="pt-3">Product Description</h5>
        {productDescription.map((desc, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter description point"
              value={desc}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
            />
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveDescriptionField(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="btn btn-primary mt-3 mx-2"
          onClick={handleAddDescriptionField}
        >
          Add Description Point
        </button>
        <select
          className="form-control my-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <h5>Images</h5>
        {productImg.map((img, index) => (
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
        {editingProduct ? (
          <>
            <button
              className="btn btn-primary mt-3 mx-2"
              onClick={handleUpdateProduct}
            >
              Update Product
            </button>
            <button className="btn btn-secondary mt-3 mx-2" onClick={resetForm}>
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-success mt-3 mx-2"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="container-fluid user-table w-100">
          <table className="table table-bordered table-hover table-striped rounded overflow-hidden">
            <thead className="bg-dark text-white">
              <tr>
                <th>Id</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Images</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.product_id}>
                    <td>{product.product_id}</td>
                    <td>{product.category_id}</td>
                    <td>{product.product_name}</td>
                    <td>
                      {product.product_description &&
                      product.product_description.length > 0 ? (
                        <ul>
                          {product.product_description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      ) : (
                        "No description"
                      )}
                    </td>
                    <td>
                      {product.product_img
                        ? product.product_img.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Product ${i}`}
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
                        new Date(product.created_at),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(product.update_at),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteProduct(product.product_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No products found.
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

export default ManageProducts;
