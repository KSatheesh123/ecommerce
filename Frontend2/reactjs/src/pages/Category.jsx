import { useParams } from "react-router-dom";
import products from "../data/products";

function Category({ cart, setCart }) {
  const { name } = useParams();
  const filtered = products.filter(
    (p) => p.category.toLowerCase() === name.toLowerCase()
  );

  const addToCart = (product) => {
    const found = cart.find(i => i._id === product._id);

    if (found) {
      setCart(
        cart.map(i =>
          i._id === product._id
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    alert("Added to cart ✅");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{name.toUpperCase()}</h2>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filtered.map((p) => (
          <div key={p._id} style={styles.card}>
            <img
              src={p.image}
              style={{
                width: "150px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              alt={p.name}
            />
            <h4
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {p.name}
            </h4>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              ₹{p.price}
            </p>
<center>
            <button
              onClick={() => addToCart(p)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"orange",
                color:"black",
                borderRadius:"30px"
              }}
            >
              Add to Cart
            </button>
            </center>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid gray",
    padding: "10px",
    margin: "10px",
    width: "200px",
    backgroundColor:"white",
    borderRadius:"10px",
    justifyContent:"center",
    alignItems:"center"
  },
};

export default Category;
