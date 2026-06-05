import { Link } from "react-router-dom";
import products from "../data/products";

function Categories() {
  
  const categories = [
    ...new Set(
      products.map(p => p.category.toLowerCase().trim())
    )
  ];

  
  const categoryImages = {
    mobiles: "https://cdn-icons-png.flaticon.com/512/0/747.png",
    laptops: "https://cdn-icons-png.flaticon.com/512/3474/3474362.png",
    clothing: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    footwear: "https://cdn-icons-png.flaticon.com/512/2589/2589903.png",
    appliances: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
    television: "https://cdn-icons-png.flaticon.com/512/2920/2920329.png",
    accessories: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    watches: "https://cdn-icons-png.flaticon.com/512/2972/2972566.png",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Categories</h2>

      {}
      <div style={styles.container}>
        {categories.map((cat) => (
          <div key={cat} style={styles.box}>
            <div style={{ backgroundColor: "violet" }}>
              <Link to={`/category/${cat}`} style={styles.link}>
                {cat.toUpperCase()}
              </Link>

              <img
                src={categoryImages[cat]}
                alt={cat}
                style={styles.image}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },

  box: {
    border: "1px solid gray",
    padding: "15px",
    textAlign: "center",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  },

  link: {
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
  },

  image: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
  },
};

export default Categories;
