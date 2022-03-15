const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
// const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// connect database
connectDB();

// create an express server with cors
// const cors = require("cors");
const app = express();

// app.use(cors());
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/stripe")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// check if this will cause problem with stripe webhook
// app.use(express.urlencoded({ extended: false }));

const User = require("../models/UserModel");

app.get("/", async (req, res) => {
  try {
    const user = await User.create({
      name: "test",
      email: "test@test.com",
      password: "test",
    });

    console.log("obj", user);
    res.send("hello");
  } catch (error) {
    console.log(error);
  }
});

// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));

// app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
