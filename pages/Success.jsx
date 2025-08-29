import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const message = location.state?.message || "Action completed successfully.";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>✅ Success</h2>
        <p style={styles.message}>{message}</p>
        <button onClick={() => navigate("/login")} style={styles.button}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(to right, #f1f8e9, #e0f7fa)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    fontSize: "24px",
    color: "#00796b",
    marginBottom: "20px",
  },
  message: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#00796b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Success;
