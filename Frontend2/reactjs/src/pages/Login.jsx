import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      alert("Please enter all fields");
      return;
    }

    
    if (password.length < 4) {
      alert("Invalid password");
      return;
    }

    // ✅ STORE LOGIN DATA (IMPORTANT)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);

    alert("Login Successful ✅");

    // Redirect to home
    navigate("/");
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "60px auto",
      padding: "25px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      fontFamily: "Segoe UI, sans-serif",
    },

    title: {
      textAlign: "center",
      marginBottom: "20px",
    },

    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },

    button: {
      width: "100%",
      padding: "12px",
      background: "#2c7be5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>🔐 Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;