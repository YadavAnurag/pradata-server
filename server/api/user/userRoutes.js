const router = require("express").Router();
const controller = require("./userController");

router.param("id", controller.params);

router.route("/users").get(controller.getList).post(controller.post);

router
  .route("/users/:id")
  .get(controller.getOne)
  .patch(controller.patchOne)
  .delete(controller.deleteOne);

router.route("*").all(controller.notPermitted);

module.exports = router;
