const router = require("express").Router();
const controller = require("./usage.Controller");

router.route("/usages").post(controller.post);

router.route("*").all(controller.notPermitted);

module.exports = router;
