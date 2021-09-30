const router = require("express").Router();
const controller = require("./usage.Controller");

router.param("id", controller.params);

router
  .route("/usages/:id")
  .post(controller.addUsage)
  .put(controller.addPayment);

router.route("*").all(controller.notPermitted);

module.exports = router;
