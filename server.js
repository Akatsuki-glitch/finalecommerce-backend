const express = require("express")
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const orderRoutes = require("./routes/order.routes");
const userRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const connectDb = require("./config/db");

const allowedOrigins = [
  "https://it1030final.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.use("/api/order", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on http://localhost:${PORT}`);
});
