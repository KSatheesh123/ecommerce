const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECT =================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
connectDB();

// ================= MODELS =================

// User Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

// Order Model
const OrderSchema = new mongoose.Schema({
  email: String,
  items: Array,
  total: Number,
  date: {
    type: Date,
    default: Date.now
  }
});
const Order = mongoose.model("Order", OrderSchema);

// ================= JWT MIDDLEWARE =================
const verifyToken = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided ❌" });
  }

  try {
    const decoded = jwt.verify(token, "SECRETKEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token ❌" });
  }
};

// ================= ROUTES =================

// ✅ REGISTER (HASH PASSWORD)
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "Registered Successfully ✅" });

  } catch (err) {
    res.status(500).json({ message: "Registration Failed ❌" });
  }
});

// ✅ LOGIN (VERIFY PASSWORD + JWT)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    const token = jwt.sign(
      { email: user.email },
      "SECRETKEY", // 👉 better store in .env
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login Success ✅",
      token,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ message: "Login Failed ❌" });
  }
});

// ✅ PLACE ORDER (PROTECTED)
app.post("/order", verifyToken, async (req, res) => {
  try {
    const { items, total } = req.body;

    const order = new Order({
      email: req.user.email, // from token
      items,
      total
    });

    await order.save();

    res.json({ message: "Order Saved ✅" });

  } catch (err) {
    res.status(500).json({ message: "Order Failed ❌" });
  }
});

// ✅ GET ORDERS (PROTECTED - optional admin)
app.get("/orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders ❌" });
  }
});

// ================= SERVER =================
app.listen(8001, () => {
  console.log("Server Running on http://localhost:8001 🚀");
});