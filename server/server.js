const express = require("express");
const app = express();
const api = require("./api/api");
const appMiddleware = require("./middleware/appMiddleware");
const config = require("./config/config");
const connectDatabase = require("./connection/dbConnection");

// config.dbURI is different depending on NODE_ENV
if (config.isDBConnectionNeeded) {
  connectDatabase(config.dbURL);
}
//database seeding
if (config.seedDatabase) {
  // seed database with fixtures
}

// middleware
appMiddleware(app);

// api endpoint
app.use("/api", api);

// bad request
app.use("*", (req, res) => res.json({ error: "Not Permitted...!" }));

module.exports = app;
