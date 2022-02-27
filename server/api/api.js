const router = require("express").Router();

const authRoutes = require("./auth/auth.Routes");
const connectRoutes = require("./connect/connectRoutes");
const errorRoutes = require("./error/error.Routes");
const planRoutes = require("./plan/planRoutes");
const usageRoutes = require("./usage/usage.Routes");
const userRoutes = require("./user/userRoutes");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.use("/auth-management", authRoutes);
router.use("/plan-management", planRoutes);
router.use("/user-management", userRoutes);
router.use("/usage-management", usageRoutes);
router.use("/connect-management", connectRoutes);
router.use("*", errorRoutes);

module.exports = router;
