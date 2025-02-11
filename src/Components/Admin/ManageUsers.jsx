import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Admin.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (error) {
      alert("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/users/${userId}`
        );
        alert(response.data.message);
        fetchUsers(); // Refresh the user list
      } catch (error) {
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Failed to delete user.");
        }
      }
    }
  };

  return (
    <>
      <div className="container-fluid pt-5 pb-5">
        <h1 className="fw-bolder mb-4 w-50 text-bg-dark text-transparent p-3 rounded m-auto text-center">
          View Users
        </h1>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="container-fluid user-table w-100">
            <table className="table table-bordered table-striped table-hover text-center rounded">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="bg-dark text-white">#</th>
                  <th className="bg-dark text-white">User ID</th>
                  <th className="bg-dark text-white">First Name</th>
                  <th className="bg-dark text-white">Last Name</th>
                  <th className="bg-dark text-white">Role</th>
                  <th className="bg-dark text-white">Email</th>
                  <th className="bg-dark text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.user_id}>
                      <td>{index + 1}</td>
                      <td>{user.user_id}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.user_type}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteUser(user.user_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
