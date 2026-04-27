import React, { useEffect, useState } from "react";

const MySessions = () => {

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 TEMP USERNAME (replace with JWT later)
  const username = "testUser";

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        const res = await fetch(
          `http://localhost:2026/api/sessions/my?username=${username}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch sessions");
        }

        const data = await res.json();
        setSessions(data);

      } catch (err) {
        console.error(err);
        setError("⚠️ Failed to load your sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchMySessions();
  }, []);

  // ⏳ LOADING
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading your sessions...</h2>;
  }

  return (
    <div style={page}>
      <h2 style={title}>My Created Sessions</h2>

      {error && <p style={errorText}>{error}</p>}

      {sessions.length === 0 && !error && (
        <p style={{ textAlign: "center" }}>No sessions created yet.</p>
      )}

      <div style={container}>
        {sessions.map((s, index) => (
          <div key={s.id || index} style={card}>

            <div style={content}>
              <h3 style={topic}>{s.topic}</h3>

              <p><b>Instructor:</b> {s.instructor}</p>
              <p><b>Date:</b> {s.date}</p>
              <p><b>Time:</b> {s.time}</p>
            </div>

            {/* 🔥 ZOOM DETAILS */}
            <div style={zoomBox}>
              <p><b>Meeting ID:</b> {s.meetingId}</p>
              <p><b>Passcode:</b> {s.passcode}</p>

              <a href={s.meetingLink} target="_blank" rel="noreferrer">
                <button style={joinBtn}>Join Session</button>
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MySessions;


/// 🎨 STYLES (MATCHING YOUR DESIGN)

const page = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "20px",
};

const title = {
  textAlign: "center",
  marginBottom: "30px",
};

const container = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "25px",
};

const card = {
  width: "300px",
  borderRadius: "15px",
  background: "#fff",
  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
  overflow: "hidden",
};

const content = {
  padding: "20px",
  textAlign: "center",
};

const topic = {
  marginBottom: "10px",
  fontSize: "20px",
};

const zoomBox = {
  padding: "15px",
  background: "#f1f5f9",
  textAlign: "center",
};

const joinBtn = {
  marginTop: "10px",
  padding: "8px 20px",
  border: "none",
  borderRadius: "20px",
  background: "#1976d2",
  color: "#fff",
  cursor: "pointer",
};

const errorText = {
  color: "red",
  textAlign: "center",
};