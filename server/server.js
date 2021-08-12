const express = require("express");
const app = express();
const api = require("./api/api");
const config = require("./config/config");
const appMiddleware = require("./middleware/appMiddleware");

// config.dbURI is different depending on NODE_ENV
const dbURI = config.dbURI;
const mongoose = require("mongoose");
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//database seeding
if (config.seedDatabase) {
  require("./util/generator");
}

app.use("/api", api);

app.use((err, req, res) => {
  if (err) {
    console.log(err.stack);
  }
});

module.exports = app;
