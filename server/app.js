require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error");
const contactRoute = require("./routes/contact");
const serviceRoute = require("./routes/service");

// to get the json data in express app.
app.use(cors())
app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/contact", contactRoute);
app.use("/api/service", serviceRoute);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to our home page" });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});