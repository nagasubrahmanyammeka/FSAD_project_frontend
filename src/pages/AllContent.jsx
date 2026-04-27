import React, { useEffect, useState } from "react";

const AllContent = () => {
  const [content, setContent] = useState([]);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:2026/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error("Error fetching content:", err));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h2>All Uploaded Content</h2>

      {content.length === 0 && <p>No content available.</p>}

      {content.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#f4f6fa",
            padding: "15px",
            margin: "15px 0",
            borderRadius: 8,
            boxShadow: "0 2px 7px rgba(0,0,0,0.06)"
          }}
        >
          <p><strong>Author:</strong> {item.author}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>File:</strong> {item.fileName}</p>

          {/* 🔥 DOWNLOAD BUTTON */}
          <a
            href={`http://localhost:2026/api/content/download/${item.id}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "8px 14px",
              backgroundColor: "#2a9d8f",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
};

export default AllContent;