const router = require("express").Router();

const groupsController = require("../../controllers/groupsController");


// Matches with "/api/groups"
router.route("/")
  .get(groupsController.findAll)
  .post(groupsController.create);

// Matches with "/api/groups/:id"
router
  .route("/:id")
  .get(groupsController.findById)
  .put(groupsController.update)
  .delete(groupsController.remove);

// For sign in?
// router
// .route("/signin")
// .get()

module.exports = router;
