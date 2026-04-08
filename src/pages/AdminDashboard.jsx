import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:2026/api/admin";

const styles = {
  bg: {
    background: "linear-gradient(135deg, #1f4037, #99f2c8)",
    minHeight: "100vh",
    padding: "40px"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
  },
  statsGrid: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    background: "#2ecc71",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
    textAlign: "center",
    fontWeight: "bold"
  },
  input: {
    padding: "8px",
    margin: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "8px 14px",
    margin: "5px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  addBtn: {
    background: "#2ecc71",
    color: "#fff"
  },
  updateBtn: {
    background: "#3498db",
    color: "#fff"
  },
  cancelBtn: {
    background: "#7f8c8d",
    color: "#fff"
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "#fff"
  },
  editBtn: {
    background: "#f39c12",
    color: "#fff"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  thtd: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center"
  }
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
    password: "",
    role: "FARMER",
    phone: "",
    location: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchFeedbacks();
  }, []);

  //  READ
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);

      setStats({
        total: res.data.length,
        farmers: res.data.filter(u => u.role === "FARMER").length,
        experts: res.data.filter(u => u.role === "EXPERT").length,
        public: res.data.filter(u => u.role === "PUBLIC").length
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:2026/api/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE
  const handleAdd = async () => {
    try {
      const payload = { ...form, role: form.role.toUpperCase() };
      delete payload.id; // Don't send null ID for new users

      await axios.post(`${API}/users`, payload);

      alert("User added!");
      resetForm();
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Add failed: " + (err.response?.data?.message || err.message));
    }
  };

  // EDIT
  const handleEdit = (user) => {
    setForm({
      id: user.id || user._id,
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role || "FARMER",
      phone: user.phone || "",
      location: user.location || ""
    });
    setIsEditing(true);
  };

  // UPDATE
  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    const payload = {
      name: form.name,
      username: form.username, // 🔥 MUST
      email: form.email,
      role: form.role.toUpperCase(),
      phone: form.phone,
      location: form.location
    };

    if (form.password && form.password.trim() !== "") {
      payload.password = form.password;
    }

    await axios.put(`${API}/users/${form.id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Updated!");
    resetForm();
    fetchUsers();

  } catch (err) {
    console.error(err);
    alert("Update failed: " + (err.response?.data?.message || err.message));
  }
};

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await axios.delete(`${API}/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ✅ RESET
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      username: "",
      email: "",
      password: "",
      role: "FARMER",
      phone: "",
      location: ""
    });
    setIsEditing(false);
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h1>Admin Dashboard</h1>

        {/* STATS */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>Total: {stats.total}</div>
          <div style={styles.statCard}>Farmers: {stats.farmers}</div>
          <div style={styles.statCard}>Experts: {stats.experts}</div>
          <div style={styles.statCard}>Public: {stats.public}</div>
        </div>

        {/* FORM */}
        <h2>{isEditing ? "Update User" : "Add User"}</h2>

        <input style={styles.input} name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input style={styles.input} name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input style={styles.input} name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input style={styles.input} name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input style={styles.input} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input style={styles.input} name="location" placeholder="Location" value={form.location} onChange={handleChange} />

        <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
          <option value="FARMER">Farmer</option>
          <option value="EXPERT">Expert</option>
          <option value="PUBLIC">Public</option>
          <option value="ADMIN">Admin</option>
        </select>

        <br />

        {isEditing ? (
          <>
            <button style={{ ...styles.button, ...styles.updateBtn }} onClick={handleUpdate}>Update</button>
            <button style={{ ...styles.button, ...styles.cancelBtn }} onClick={resetForm}>Cancel</button>
          </>
        ) : (
          <button style={{ ...styles.button, ...styles.addBtn }} onClick={handleAdd}>Add User</button>
        )}

        {/* TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thtd}>Name</th>
              <th style={styles.thtd}>Username</th>
              <th style={styles.thtd}>Email</th>
              <th style={styles.thtd}>Role</th>
              <th style={styles.thtd}>Phone</th>
              <th style={styles.thtd}>Location</th>
              <th style={styles.thtd}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u.id || u._id}>
                <td style={styles.thtd}>{u.name}</td>
                <td style={styles.thtd}>{u.username}</td>
                <td style={styles.thtd}>{u.email}</td>
                <td style={styles.thtd}>{u.role}</td>
                <td style={styles.thtd}>{u.phone}</td>
                <td style={styles.thtd}>{u.location}</td>
                <td style={styles.thtd}>
                  <button style={{ ...styles.button, ...styles.editBtn }} onClick={() => handleEdit(u)}>Edit</button>
                  <button style={{ ...styles.button, ...styles.deleteBtn }} onClick={() => handleDelete(u.id || u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          style={{
            padding: "10px 18px",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px"
          }}
          onClick={() => navigate("/admin/feedbacks")}
        >
          View All Feedbacks
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;