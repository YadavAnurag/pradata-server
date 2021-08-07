const router = require("express").Router();
const controller = require("./planController");

router.param("id", controller.params);

router.route("/plans").get(controller.getList).post(controller.post);

router
  .route("/plans/:id")
  .get(controller.getOne)
  .patch(controller.patchOne)
  .delete(controller.deleteOne);

module.exports = router;
