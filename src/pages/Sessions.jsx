import React, { useEffect, useState } from "react";

const Sessions = () => {

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = "testUser"; // 🔥 replace later

  // 🔥 FETCH SESSIONS
  const fetchSessions = async () => {
    try {
      const res = await fetch("https://fsadprojectbackend-production-4192.up.railway.app/api/sessions");

      if (!res.ok) throw new Error("Failed to fetch sessions");

      const data = await res.json();
      setSessions(data);

    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to load sessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // ✅ REGISTER
  const handleRegister = async (id) => {
    try {
      const res = await fetch(
        `https://fsadprojectbackend-production-4192.up.railway.app/api/sessions/register/${id}?username=${username}`,
        { method: "POST" }
      );

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      alert(text);
      fetchSessions();

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  // ✅ UNREGISTER (🔥 THIS WAS MISSING)
  const handleUnregister = async (id) => {
    try {
      const res = await fetch(
        `https://fsadprojectbackend-production-4192.up.railway.app/api/sessions/unregister/${id}?username=${username}`,
        { method: "POST" }
      );

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      alert(text);
      fetchSessions();

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading sessions...</h2>;
  }

  return (
    <div style={page}>

      <h2 style={title}>Available Sessions</h2>

      {error && <p style={errorText}>{error}</p>}

      <div style={container}>

        {sessions.map((s, index) => {

          const isExpired = s.date < today;
          const alreadyRegistered = s.registeredUsers?.includes(username);

          return (
            <div key={s.id || index} style={card}>

              {/* CONTENT */}
              <div style={content}>
                <p style={timeText}>{s.date}</p>

                <h3 style={topic}>{s.topic}</h3>

                <p style={desc}>
                  Instructor: {s.instructor}
                </p>

                <p><b>Time:</b> {s.time}</p>
                <p><b>Date:</b> {s.date}</p>
              </div>

              {/* FOOTER */}
              <div style={footer}>

                {isExpired ? (
                  <span style={expired}>Expired</span>

                ) : alreadyRegistered ? (
                  <div style={{ textAlign: "center" }}>

                    <p style={{ color: "#fff", marginBottom: 5 }}>
                      Registered
                    </p>

                    <a href={s.meetingLink} target="_blank" rel="noreferrer">
                      <button style={joinBtn}>Join</button>
                    </a>

                    {/* 🔥 UNREGISTER BUTTON */}
                    <button
                      onClick={() => handleUnregister(s.id)}
                      style={unregisterBtn}
                    >
                      Unregister
                    </button>

                  </div>

                ) : (
                  <button
                    onClick={() => handleRegister(s.id)}
                    style={btn}
                  >
                    Register
                  </button>
                )}

              </div>

              {/* 🔥 ZOOM DETAILS */}
              {alreadyRegistered && (
                <div style={zoomBox}>
                  <p><b>Meeting ID:</b> {s.meetingId}</p>
                  <p><b>Passcode:</b> {s.passcode}</p>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sessions;



// 🎨 STYLES (UNCHANGED)

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
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
};

const content = {
  padding: "20px",
  textAlign: "center",
};

const timeText = {
  fontSize: "12px",
  color: "gray",
  marginBottom: "10px",
};

const topic = {
  marginBottom: "10px",
  fontSize: "20px",
};

const desc = {
  fontSize: "14px",
  color: "#555",
};

const footer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "15px",
  background: "#2a9d8f",
};

const btn = {
  padding: "8px 20px",
  border: "none",
  borderRadius: "20px",
  background: "#fff",
  color: "#2a9d8f",
  cursor: "pointer",
  fontWeight: "bold",
};

const joinBtn = {
  padding: "8px 20px",
  border: "none",
  borderRadius: "20px",
  background: "#1976d2",
  color: "#fff",
  cursor: "pointer",
};

const unregisterBtn = {
  marginTop: "8px",
  padding: "6px 16px",
  border: "none",
  borderRadius: "20px",
  background: "#e63946",
  color: "#fff",
  cursor: "pointer",
};

const zoomBox = {
  padding: "10px",
  background: "#f1f5f9",
  textAlign: "center",
};

const expired = {
  color: "#fff",
  fontWeight: "bold",
};

const errorText = {
  color: "red",
  textAlign: "center",
};