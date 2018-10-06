const router = require("express").Router();

const userController = require("../../controllers/userController");
console.log(userController);

// Matches with "/api/user"
// router.route("/")
//   .get(userController.findBy)
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

router.route("/signin") // /api/user/signin
  .get(userController.findByEmail)
  .post(userController.create);

module.exports = router;