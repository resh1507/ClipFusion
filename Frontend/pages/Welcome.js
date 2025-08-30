import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleStart = () => navigate("/home");

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>🎬 ClipFusion</h1>
      <h2 style={styles.greeting}>Welcome back, {username} 👋</h2>
      <p style={styles.tagline}>Connect your thoughts directly to video moments.</p>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🚀 How ClipFusion Works</h2>
        <ol style={styles.list}>
          <li>📎 Paste any YouTube video link</li>
          <li>⏸️ Pause at key moments</li>
          <li>📝 Add a timestamped note</li>
          <li>⏩ Click a timestamp to jump to that part!</li>
        </ol>
      </div>

      <button onClick={handleStart} style={styles.button}>
        👉 Start Using ClipFusion
      </button>

      <footer style={styles.footer}>
        <p>Built with ❤️ to simplify video learning.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center",
    background: "linear-gradient(to right, #f1f8e9, #e0f7fa)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: "10px",
  },
  greeting: {
    fontSize: "1.5rem",
    color: "#00796b",
    marginBottom: "10px",
  },
  tagline: {
    fontSize: "1.2rem",
    color: "#444",
    marginBottom: "30px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "30px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    marginBottom: "40px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "16px",
    color: "#00796b",
  },
  list: {
    textAlign: "left",
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "#333",
  },
  button: {
    padding: "14px 32px",
    fontSize: "1.1rem",
    backgroundColor: "#00796b",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  footer: {
    marginTop: "60px",
    fontSize: "0.9rem",
    color: "#666",
  },
};

export default Welcome;

