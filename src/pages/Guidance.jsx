import React, { useState } from "react";
import axios from "axios";

const Guidance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:2026/api/guidance", // ✅ make sure port is correct
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Saved:", res.data);

      setSuccess("Guidance request submitted successfully!");

      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("❌ Error:", err);

      
      if (err.response) {
        setError(
          err.response.data?.message ||
            err.response.data?.errors?.[0]?.defaultMessage ||
            "Server error"
        );
      } else if (err.request) {
        setError("Server not responding. Check backend.");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <fieldset
        style={{
          padding: "25px",
          borderRadius: "15px",
          background: "#ffffff",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Guidance Request
        </h2>

        {/* 🔴 ERROR */}
        {error && (
          <div
            style={{
              background: "#ffebee",
              color: "#d32f2f",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              border: "1px solid #ef5350",
            }}
          >
            {error}
          </div>
        )}

        {/* 🟢 SUCCESS */}
        {success && (
          <div
            style={{
              background: "#e8f5e9",
              color: "#2e7d32",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              border: "1px solid #4caf50",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "500" }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "500" }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </div>

          {/* MESSAGE */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "500" }}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Describe your problem"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#ccc" : "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit Guidance"}
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default Guidance;