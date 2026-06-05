import products from "../data/products";
function Home({ cart, setCart }) {
const addToCart = (product) => {
    const exist = cart.find(i => i._id === product._id);
    if (exist) {
    setCart(cart.map(i =>i._id === product._id? { ...i,qty:i.qty+1}:i));
    }
    else {
    setCart([...cart, { ...product, qty: 1 }]);
    alert("Added to Cart ");
    }
};
return (
    <div style={{ padding: 20 }}>
      <h2 style={{fontSize:"30px"}}>All Products</h2>
      <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)", 
        gap: "20px",
      }}
    >
      {products.map(p => (
        <div key={p._id} style={{ border: "1px solid gray",backgroundColor:"slateblue",padding:"10px",borderRadius:"20px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",color:"white"}}>
          <img src={p.image} alt="" style={{width:"200px",height:"200px"}}></img>
          <h4 style={{fontSize:"20px",color:"orange"}}>{p.name}</h4>
          <p >₹{p.price}</p>
          <button onClick={() => addToCart(p)} style={{color:"white",fontSize:"25px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"orange",borderRadius:"30px",padding:"10px",paddingLeft:"40px",paddingRight:"40px"}}>Add to Cart</button></div>))}
     </div>
     </div>
  );
}
export default Home;
