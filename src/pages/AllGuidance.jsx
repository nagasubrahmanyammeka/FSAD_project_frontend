import React, { useEffect, useState } from "react";

const AllGuidance = () => {
  const [guidance, setGuidance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 FETCH FROM BACKEND
  useEffect(() => {
    const fetchGuidance = async () => {
      try {
        const res = await fetch("http://localhost:2026/api/guidance");

        if (!res.ok) {
          throw new Error("Failed to fetch guidance");
        }

        const data = await res.json();

        setGuidance(data); // ✅ store backend data
      } catch (err) {
        console.error(err);
        setError("Unable to load guidance");
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, []);

  // 🔹 LOADING STATE
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading guidance...</h2>;
  }

  // 🔹 ERROR STATE
  if (error) {
    return (
      <h2 style={{ textAlign: "center", color: "red" }}>
        {error}
      </h2>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2>All Guidance Provided by Experts</h2>

      {guidance.length === 0 && <p>No Guidance found!</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {guidance.map((item) => (
          <li
            key={item.id} // ✅ backend uses id (not _id)
            style={{
              background: "#f9fafc",
              margin: "10px 0",
              borderRadius: 8,
              padding: "16px",
              boxShadow: "0 2px 7px rgba(0,0,0,0.06)",
            }}
          >
            <p>
              <strong>Name:</strong> {item.name}
            </p>

            <p>
              <strong>Email:</strong> {item.email}
            </p>

            <p>
              <strong>Message:</strong> {item.message}
            </p>

            {item.createdAt && (
              <p style={{ fontSize: "12px", color: "gray" }}>
                Submitted At: {item.createdAt}
              </p>
            )}

            <br />

            <p>
              Contact By: <strong>{item.email}</strong>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllGuidance;