const router = require("express").Router();
const planRoutes = require("./plan/planRoutes");
const userRoutes = require("./user/userRoutes");

router.use("/plan-management", planRoutes);
router.use("/user-management", userRoutes);

module.exports = router;
