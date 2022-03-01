require("dotenv").config();

const devConfig = {
  devConfig: false,
  port: process.env.port || process.env.DEV_PORT,
  dbURL: process.env.DEV_DB_URI,
};

const prodConfig = {
  prodConfig: true,
  port: process.env.port || process.env.PROD_PORT,
  dbURL: process.env.PROD_DB_URI,
};

let config = {};

if (devConfig.devConfig) {
  config = { ...prodConfig, ...devConfig };
} else {
  config = { ...devConfig, ...prodConfig };
}

// set seedDatabase true of false
config.seedDatabase = false;

// isDBConnectionNeeded
config.isDBConnectionNeeded = true;

module.exports = config;
