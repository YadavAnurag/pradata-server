const router = require("express").Router();
const controller = require("./error.Controller");

router.route("*").all(controller.notPermitted);

module.exports = router;
