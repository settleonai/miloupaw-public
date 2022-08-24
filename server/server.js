const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const cron = require("node-cron");
const {
  payEmployeesCompletedAppointments,
  payoutCompletedAppointments,
} = require("./controllers/businessController");

// run a scheduled task everyday at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  // cron.schedule("* * * * *", async () => {
  console.log("paying employees for completed appointments".green);
  const paidapts = await payEmployeesCompletedAppointments();
  console.log(`${paidapts.length} appointments paid`.green);
  console.log("========================================".green);
  paidapts.forEach((apt) => {
    console.log(`${apt}`.green);
  });
  // console.log("transferring money to the bank for completed appointments".cyan);
  // const payouts = await payoutCompletedAppointments();
  // console.log(`${payouts.length} appointments payed out`.cyan);
  // console.log("========================================".cyan);
  // payouts.forEach((apt) => {
  //   console.log(`${apt}`.cyan);
  // });
});

// set port to 5010 in development
const port =
  process.env.NODE_ENV !== "production" ? 5010 : process.env.PORT || 5000;

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

app.use("/users", require("./routes/userRoutes"));
app.use("/pets", require("./routes/petRoutes"));
app.use("/locations", require("./routes/locationRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));
app.use("/business", require("./routes/businessRoutes"));
app.use("/stripe", require("./routes/stripeRoutes"));
app.use("/errors", require("./routes/errorRoutes"));

// app.use("/test", require("./routes/testRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
