const router = require("express").Router();
const planRoutes = require("./plan/planRoutes");
const userRoutes = require("./user/userRoutes");
const errorRoutes = require("./error/error.Routes");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.use("/plan-management", planRoutes);
router.use("/user-management", userRoutes);

router.use("*", errorRoutes);

module.exports = router;
