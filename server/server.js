const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", require("./routes/userRoutes"));
app.use("/pets", require("./routes/petRoutes"));
app.use("/locations", require("./routes/locationRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));
app.use("/business", require("./routes/businessRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
