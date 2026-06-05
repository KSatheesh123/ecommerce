import { Link, useNavigate } from "react-router-dom";

function Navbar({ cart }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully");
    navigate("/login");
  };

  const handleCartClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please login to view cart / place order");
      navigate("/login");
    }
  };

  return (
    <nav style={styles.navbar}>
      
      {/* Left Section (Logo + Title) */}
      <div style={styles.logoContainer}>
        <img
          src="minishop.png"
          alt="MiniShop"
          style={styles.logo}
        />
        <h1 style={styles.title}>MINISHOP</h1>
      </div>

      {/* Right Section (Links) */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/categories" style={styles.link}>Categories</Link>

        <Link to="/cart" onClick={handleCartClick} style={styles.link}>
          Cart ({cart.length})
        </Link>

        {isLoggedIn ? (
          <span onClick={handleLogout} style={styles.link}>
            Logout
          </span>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 40px",
    backgroundColor: "#1e1e2f",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logo: {
  width: "85px",   // increased from 50px
  height: "85px",
},

title: {
  fontSize: "30px",  // increased from 24px
  color: "lightgreen",
  margin: 0,
  fontWeight: "bold",
},

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Navbar;