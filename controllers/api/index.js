const router = require("express").Router();

const commentRoute = require("./commentRoutes");
const postRoute = require("./postRoutes");
const userRoute = require("./userRoutes");

router.use("/comments", commentRoute);
router.use("/posts", postRoute);
router.use("/user", userRoute);

// mapping router
module.exports = router;
