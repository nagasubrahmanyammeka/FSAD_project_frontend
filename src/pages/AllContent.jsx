import React, { useState } from "react";

const AllContent = () => {

  const [content] = useState([
    {
      id: 1,
      author: "Dr. Ramesh",
      description: "Organic farming techniques PDF",
      fileName: "organic-farming.pdf"
    },
    {
      id: 2,
      author: "Dr. Priya",
      description: "Soil health improvement guide",
      fileName: "soil-guide.docx"
    }
  ]);

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
        </div>
      ))}
    </div>
  );
};

export default AllContent;