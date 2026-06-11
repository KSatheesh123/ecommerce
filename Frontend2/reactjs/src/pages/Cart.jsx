import axios from "axios";

function Cart({ cart, setCart }) {

  const total = cart.reduce(
    (s, i) => s + i.price * i.qty, 0
  );

  const checkout = async () => {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("Please login to place order");
      return;
    }

    const email = localStorage.getItem("email");

    try {
      await axios.post("https://ecommerce-backend-xyz.onrender.com/order", {
        email,
        items: cart,
        total
      });

      alert("Order Placed Successfully ✅");
      setCart([]);

    } catch (err) {
      alert("Order Failed ❌");
    }
  };

  const styles = {
    container: {
      maxWidth: "650px",
      margin: "40px auto",
      padding: "25px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      fontFamily: "Segoe UI, sans-serif",
    },

    title: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#222",
    },

    empty: {
      textAlign: "center",
      color: "#777",
      fontSize: "16px",
    },

    item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #eee",
    },

    name: {
      fontWeight: "500",
      fontSize: "16px",
    },

    qty: {
      color: "#666",
      marginLeft: "5px",
    },

    price: {
      fontWeight: "bold",
      color: "#2c7be5",
    },

    totalBox: {
      marginTop: "25px",
      padding: "15px",
      background: "#f8f9fa",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "18px",
      fontWeight: "bold",
    },

    button: {
      marginTop: "20px",
      width: "100%",
      padding: "12px",
      background: "#2c7be5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "0.3s",
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>🛒 My Cart</h2>

      {cart.length === 0 && (
        <p style={styles.empty}>Your cart is empty</p>
      )}

      {cart.map(i => (
        <div key={i._id} style={styles.item}>
          <div>
            <span style={styles.name}>{i.name}</span>
            <span style={styles.qty}> × {i.qty}</span>
          </div>

          <span style={styles.price}>
            ₹{i.price * i.qty}
          </span>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div style={styles.totalBox}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            style={styles.button}
            onClick={checkout}
          >
            Checkout
          </button>
        </>
      )}

    </div>
  );
}

export default Cart;