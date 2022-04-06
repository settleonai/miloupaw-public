const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  console.log(req.method); // "POST"
  console.log(req.path); // "/payment"
  if (req.originalUrl.startsWith("/stripe")) {
    next();
  } else {
    express.json()(req, res, next);
    express.urlencoded({ extended: false });
  }
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use("/users", require("./routes/userRoutes"));
app.use("/pets", require("./routes/petRoutes"));
app.use("/locations", require("./routes/locationRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));
app.use("/business", require("./routes/businessRoutes"));
app.use("/stripe", require("./routes/stripeRoutes"));

app.use("/test", require("./routes/testRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
