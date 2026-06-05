import axios from "axios";
import { useState } from "react";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const register = async () => {

    await axios.post("http://localhost:8000/register", {
      name,
      email,
      password
    });

    alert("Registered ✅");
  };

  const styles = {
    container: {
      maxWidth: "420px",
      margin: "80px auto",
      padding: "25px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },

    title: {
      marginBottom: "20px",
      color: "#2c3e50",
    },

    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "15px",
    },

    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#27ae60",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Register</h2>

      <input
        placeholder="Name"
        style={styles.input}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        style={styles.input}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        onChange={e => setPass(e.target.value)}
      />

      <button
        style={styles.button}
        onClick={register}
      >
        Register
      </button>

    </div>
  );
}

export default Register;