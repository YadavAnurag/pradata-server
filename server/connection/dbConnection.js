const mongoose = require("mongoose");

const connectDatabase = async (dbURL) => {
  if (dbURL === undefined) {
    console.log("Please provide dbURL for DB connection\n");
    return;
  }

  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      autoIndex: false,
    });
  } catch (error) {
    console.log(
      "[dbConnection.js]",
      "failed to connect to database on first connection"
    );
  }
};

// initial connecting
mongoose.connection.on("connecting", () => {
  console.log("Initial DB connecting...");
});

// all the error after initial connection made
mongoose.connection.on("error", (err) => {
  console.log("Got database connection error\n", err);
});

// after initial connected or when if reconnects
mongoose.connection.on("connected", () => {
  console.log("DB connected successfully");
});

// code error, db server crashing, or network issues disconnected
mongoose.connection.on("disconnected", (err) => {
  console.log("DB disconnected \n", err);
});

// if Mongoose lost connectivity to MongoDB and successfully reconnected
mongoose.connection.on("reconnected", () => {
  console.log("DB reconnected");
});

module.exports = connectDatabase;
