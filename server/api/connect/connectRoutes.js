const router = require("express").Router();
const controller = require("./connectController");

router.route("/connect").get(controller.get).patch(controller.patch);
router.route("*").all(controller.notPermitted);
module.exports = router;
