import React, { useEffect, useState } from "react";
import axios from "axios";

function AllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2026/api/feedbacks") // ✅ FIXED ENDPOINT
      .then((res) => {
        setFeedbacks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("⚠️ Failed to load feedbacks. Backend may not be running.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading feedbacks...
      </h2>
    );
  }

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h2 style={styles.title}>All Feedbacks</h2>

        {/* ERROR MESSAGE */}
        {error && <p style={styles.error}>{error}</p>}

        {/* NO DATA */}
        {feedbacks.length === 0 && !error && (
          <p style={{ textAlign: "center" }}>No feedbacks found!</p>
        )}

        {/* LIST */}
        <ul style={styles.list}>
          {feedbacks.map((fb) => (
            <li key={fb.id} style={styles.item}> {/* ✅ FIXED id */}
              <p><strong>Name:</strong> {fb.name}</p>
              <p><strong>Email:</strong> {fb.email}</p>
              <p><strong>Message:</strong> {fb.message}</p>
              <p style={styles.date}>
                {fb.createdAt && new Date(fb.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllFeedbacks;

const styles = {
  bg: {
    background: "linear-gradient(135deg, #1f4037, #99f2c8)",
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "700px"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2e7d32"
  },
  error: {
    color: "#d32f2f",
    background: "#ffebee",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
    textAlign: "center"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  item: {
    background: "#f4f6fa",
    marginBottom: "15px",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  date: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#777"
  }
};