import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.toLowerCase(),
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/welcome");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Login to ClipFusion</h2>

        <div style={styles.inputGroup}>
          <input
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Email"
          />
        </div>

        <div style={styles.inputGroup}>
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, paddingRight: "12px" }}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div style={styles.optionsRow}>
          <label style={styles.rememberLabel}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            /> Remember me
          </label>
          <Link to="/forgot-password" style={styles.forgotPassword}>
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          style={{
            ...styles.button,
            backgroundColor: loading ? "#aaa" : "#00695c",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.registerText}>
          Don’t have an account? <Link to="/register" style={styles.registerLink}>Register</Link>
        </p>
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
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    width: "360px",
  },
  title: {
    marginBottom: "24px",
    color: "#1d3557",
    fontSize: "24px",
    textAlign: "center",
  },
  inputGroup: { marginBottom: "16px" },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#ffffe0",
  },
  passwordWrapper: { position: "relative" },
  toggleButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
  optionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  rememberLabel: { fontSize: "14px", color: "#333" },
  forgotPassword: { fontSize: "14px", textDecoration: "none", color: "#0077b6" },
  button: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
  },
  registerText: { textAlign: "center", marginTop: "20px", fontSize: "14px" },
  registerLink: { color: "#0077b6", textDecoration: "none", fontWeight: "bold" },
};

export default Login;
