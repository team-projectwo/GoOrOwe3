const router = require("express").Router();
const groupRoutes = require("./groups");
const userRoutes = require("./user");

// Book routes
router.use("/groups", groupRoutes);
router.use("/user", userRoutes);

module.exports = router;
