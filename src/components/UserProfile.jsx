import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";

export default function UserProfile() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // -----------------------------
  // Fetch user details
  // -----------------------------
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authLoading) return;

      if (!user) {
        setError("User not logged in. Redirecting to login...");
        setLoading(false);
        setTimeout(() => navigate("/login"), 1500);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please login again.");
          setLoading(false);
          setTimeout(() => {
            logout();
            navigate("/login");
          }, 1500);
          return;
        }

        const response = await fetch("http://localhost:2026/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          setError("Session expired. Please login again.");
          setLoading(false);
          setTimeout(() => {
            logout();
            navigate("/login");
          }, 1500);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch profile.");

        const data = await response.json();
        setDetails(data.user);
        setError("");
      } catch (err) {
  console.log("Backend not available. Showing test user profile.");

  const roles = ["farmer", "public", "expert", "admin"];

  setDetails({
    _id: "test12345",
    name: "Demo User",
    email: "demo@example.com",
    phone: "9876543210",
    location: "Hyderabad",
    role: roles[Math.floor(Math.random() * roles.length)],
    profileImage: "",
  });

  setError(""); // Clear error so UI doesn't show error screen
}finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user, authLoading, navigate, logout]);

  // -----------------------------
  // DELETE ACCOUNT FUNCTION
  // -----------------------------
  const handleDeleteAccount = async () => {
    if (!details?._id) return;

    if (
      !window.confirm(
        `⚠️ Are you sure you want to delete your account?\n\n` +
          `Name: ${details.name}\n` +
          `Email: ${details.email}\n` +
          `Role: ${details.role}\n\n` +
          `This action CANNOT be undone!`
      )
    ) {
      return;
    }

    setDeleting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:2026/api/admin/users/${details._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete account");
      }

      alert("✅ Account deleted successfully.");
      logout();
      navigate("/register");
    } catch (err) {
      console.error(err);
      alert("❌ Unable to delete account. Try again later.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading || authLoading) {
    return <div style={styles.loading}>Loading profile...</div>;
  }

  if (error) {
    return (
      <div style={styles.error}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/login")} style={styles.retryBtn}>
          Go to Login
        </button>
      </div>
    );
  }

  if (!details) return null;

  const { name = "", email = "", phone = "", location = "", role = "" } = details;

  function handleDashboard() {
    const roleClean = role.trim().toLowerCase();
    if (roleClean === "farmer") navigate("/farmer");
    else if (roleClean === "public") navigate("/public");
    else if (roleClean === "admin") navigate("/admin");
    else if (roleClean === "expert") navigate("/expert");
    else navigate("/");
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <div style={styles.profileHeading}>Profile</div>

        <div style={{ textAlign: "center", margin: "26px 0 18px 0" }}>
          <img
            src={details.profileImage || defaultAvatar}
            alt="User Avatar"
            style={styles.avatar}
          />
          <div style={styles.name}>{name}</div>
          <div style={styles.role}>
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Full Name</label>
            <input disabled style={styles.input} value={name} />
          </div>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Email</label>
            <input disabled style={styles.input} value={email} />
          </div>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Phone</label>
            <input disabled style={styles.input} value={phone} />
          </div>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Location</label>
            <input disabled style={styles.input} value={location} />
          </div>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Role</label>
            <input
              disabled
              style={styles.input}
              value={role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
            />
          </div>
        </div>

        {/* update button */}
        <button onClick={() => navigate("/profile/update")} style={styles.updateBtn}>
          Update Profile
        </button>

        {/* delete button */}
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          style={{
            ...styles.deleteBtn,
            opacity: deleting ? 0.6 : 1,
            cursor: deleting ? "not-allowed" : "pointer",
          }}
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>

        <button style={styles.dashboardBtn} onClick={handleDashboard}>
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}

// -----------------------------
// STYLES
// -----------------------------
const styles = {
  pageWrapper: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    width: "800px",
    maxWidth: "100%",
    boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
  },
  profileHeading: {
    fontWeight: "bold",
    fontSize: "1.45rem",
    color: "#153518",
    marginBottom: "7px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
  },
  name: {
    fontSize: "1.13rem",
    fontWeight: "bold",
    color: "#226147",
    marginTop: "8px",
  },
  role: {
    color: "#8da886",
    fontSize: "1.04rem",
  },
  fieldGroup: {
    marginTop: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  inputLabel: {
    width: "120px",
    minWidth: "120px",
    fontWeight: "500",
    color: "#153518",
  },
  input: {
    flex: 1,
    fontSize: "1.04rem",
    padding: "10px 12px",
    borderRadius: "7px",
    border: "1px solid #eaeaea",
    background: "#f6f6f6",
    color: "#55786e",
  },
  updateBtn: {
    marginTop: "20px",
    padding: "12px",
    background: "#16794C",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  deleteBtn: {
    marginTop: "12px",
    padding: "12px",
    background: "#cf2323",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  dashboardBtn: {
    marginTop: "18px",
    padding: "12px",
    background: "#27a844",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loading: { textAlign: "center", padding: "40px", fontSize: "1.2rem" },
  error: { color: "red", textAlign: "center", padding: "40px" },
  retryBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
  },
};
