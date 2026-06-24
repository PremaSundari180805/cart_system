const express = require("express");
const cors = require("cors");

const productRoutes =
require("./routes/productRoutes");

const cartRoutes =
require("./routes/cartRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/products", productRoutes);

app.use("/cart", cartRoutes);

app.listen(3000, () => {
    console.log("Server Started");
});