require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const app = express();
const port = process.env.PORT;
const authrouter = require("./routes/auth");
const productrouter = require("./routes/product");
const orderrouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authrouter);
app.use("/api/v1", productrouter);
app.use("/api/v1", orderrouter);
app.use("/api/v1", paymentRouter);

connectDB();

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
