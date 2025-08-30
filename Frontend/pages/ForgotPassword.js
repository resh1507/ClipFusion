import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (!email || !newPassword || !confirmPassword) {
      return alert("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
        newPassword,
        confirmPassword,
      });

      window.location.href = "/success";
      window.history.replaceState({ message: "Password reset successfully!" }, "");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔑 Reset Password</h2>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          value={newPassword}
          placeholder="New password"
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleReset} style={styles.button}>Reset Password</button>
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
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "350px",
  },
  title: {
    marginBottom: "20px",
    color: "#1d3557",
    fontSize: "22px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#00796b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ForgotPassword;
