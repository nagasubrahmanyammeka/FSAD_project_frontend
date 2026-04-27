import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateContent = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🔥 UPDATED SUBMIT (REAL API CALL)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Choose a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("author", author);
      formData.append("description", description);
      formData.append("file", file);

      const response = await fetch(
        "http://localhost:2026/api/content/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Uploaded:", data);

      alert("Content uploaded successfully!");

      // RESET FORM
      setFile(null);
      setDescription("");
      setAuthor("");

      // NAVIGATE
      navigate("/all-content");

    } catch (error) {
      console.error(error);
      alert("Error uploading content");
    }
  };

  return (
    <div
      className="page-container"
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        background: "#f4f6fa",
        borderRadius: 8,
        boxShadow: "0 2px 7px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Upload Content (PDF, DOCX, MP4, etc.)
        <br/>
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* AUTHOR */}
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
          }}
        >
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </label>

        {/* DESCRIPTION */}
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
          }}
        >
          Short Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            style={{
              padding: "10px",
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </label>

        {/* FILE */}
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
          }}
        >
  
          File:
          <p>(Max File Size - 50GB)</p>
          <input
            type="file"
            onChange={handleFileChange}
            required
            accept=".pdf,.docx,.txt,.mp4,.doc"
            style={{ marginTop: 8 }}
          />
        </label>

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            padding: "10px 24px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#2a9d8f",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            alignSelf: "center",
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreateContent;