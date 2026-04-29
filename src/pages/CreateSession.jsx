import React, { useState } from "react";

const CreateSession = () => {
  const [form, setForm] = useState({
    topic: "",
    instructor: "",
    date: "",
    time: "",
    meetingLink: "",
    meetingId: "",
    passcode: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // 🔥 TEMP USERNAME (replace with JWT later)
      const username = "testUser";

      const response = await fetch(
        `https://fsadprojectbackend-production-4192.up.railway.app/api/sessions?username=${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          },
          body: JSON.stringify(form),
        }
      );

      const text = await response.text();
      console.log("SERVER RESPONSE:", text);

      if (!response.ok) {
        throw new Error(text);
      }

      alert("Session Created Successfully!");

      // 🔄 RESET FORM
      setForm({
        topic: "",
        instructor: "",
        date: "",
        time: "",
        meetingLink: "",
        meetingId: "",
        passcode: ""
      });

    } catch (error) {
      console.error("ERROR:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={container}>
      <h2>Create Session</h2>

      <form onSubmit={handleSubmit} style={formStyle}>

        <input
          placeholder="Topic"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          required
          style={input}
        />

        <input
          placeholder="Instructor"
          value={form.instructor}
          onChange={(e) => setForm({ ...form, instructor: e.target.value })}
          required
          style={input}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          style={input}
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
          style={input}
        />

        {/* 🔥 ZOOM DETAILS */}

        <input
          placeholder="Zoom Meeting Link"
          value={form.meetingLink}
          onChange={(e) => setForm({ ...form, meetingLink: e.target.value })}
          required
          style={input}
        />

        <input
          placeholder="Meeting ID"
          value={form.meetingId}
          onChange={(e) => setForm({ ...form, meetingId: e.target.value })}
          required
          style={input}
        />

        <input
          placeholder="Passcode"
          value={form.passcode}
          onChange={(e) => setForm({ ...form, passcode: e.target.value })}
          required
          style={input}
        />

        <button style={btn}>Create</button>
      </form>
    </div>
  );
};

export default CreateSession;


/// 🎨 STYLES (UNCHANGED)

const container = {
  maxWidth: 500,
  margin: "40px auto",
  padding: 20,
  background: "#f4f6fa",
  borderRadius: 8
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 15
};

const input = {
  padding: "10px",
  borderRadius: 6,
  border: "1px solid #ccc"
};

const btn = {
  padding: "10px",
  background: "#2a9d8f",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};