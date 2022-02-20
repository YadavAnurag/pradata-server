const router = require("express").Router();
const controller = require("./auth.Controller");

router.route("/login").post(controller.login);

router.route("*").all(controller.notPermitted);

module.exports = router;
