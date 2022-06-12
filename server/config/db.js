const mongoose = require("mongoose");

mongoose.set("debug", process.env.NODE_ENV !== "production");
console.log(`Node Environment: ${process.env.NODE_ENV}`.cyan.underline);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.NODE_ENV !== "production"
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
