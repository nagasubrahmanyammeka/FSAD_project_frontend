import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ExpertDashboard = () => {
  const navigate = useNavigate();

  // 🔥 OPTIONAL: check login before navigation
  const handleProtectedRoute = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    navigate(path);
  };

  return (
    <div
      className="dashboard-bg"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        background: "#0bdb2a08",
        minHeight: "100vh",
      }}
    >
      <div
        className="dashboard-card"
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          width: "90%",
          maxWidth: "700px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          Expert Dashboard
        </h1>

        <p style={{ textAlign: "center", color: "#555" }}>
          Welcome, expert! Here you can guide users, create educational content,
          and provide support as needed.
        </p>

        <div
          className="expert-actions"
          style={{
            marginTop: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          
          {/* GUIDANCE */}
          <div
            className="card"
            style={{
              background: "#f8fafc",
              padding: "15px 20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>Educational Guidence</h3>

            <p
              style={{
                fontSize: "14px",
                color: "#555",
                marginBottom: "10px",
              }}
            >
              Offer advice, answer user queries, and share best practices in your field.
            </p>

            <Link to="/guidance" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "6px 14px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  backgroundColor: "#3ae011ff",
                  color: "#0a0a0aff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Go to Guidence Portal
              </button>
            </Link>
          </div>

          {/* CREATE CONTENT */}
          <div
            className="card"
            style={{
              background: "#f8fafc",
              padding: "15px 20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>Create Educational Content</h3>

            <p
              style={{
                fontSize: "14px",
                color: "#555",
                marginBottom: "10px",
              }}
            >
              Upload articles, videos, or resources to educate and empower users.
            </p>

            <button
              onClick={() => handleProtectedRoute("/create-content")}
              style={{
                padding: "6px 14px",
                fontSize: "14px",
                borderRadius: "6px",
                backgroundColor: "#3ae011ff",
                color: "#0a0a0aff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create Content
            </button>
          </div>

          {/* 🔥 NEW: CREATE SESSION */}
          <div
            className="card"
            style={{
              background: "#f8fafc",
              padding: "15px 20px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>Create Session</h3>

            <p
              style={{
                fontSize: "14px",
                color: "#555",
                marginBottom: "10px",
              }}
            >
              Schedule a session with farmers including date, time, and topic.
            </p>

            <button
              onClick={() => handleProtectedRoute("/create-session")}
              style={{
                padding: "6px 14px",
                fontSize: "14px",
                borderRadius: "6px",
                backgroundColor: "#3ae011ff",
                color: "#0a0a0aff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create Session
            </button>
          </div>

          
        </div>

        {/* FEEDBACK */}
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <p style={{ color: "#444" }}>Want to share feedback?</p>

          <button
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "6px",
              backgroundColor: "#16a34a",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/feedback")}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;