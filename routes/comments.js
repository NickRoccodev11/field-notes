const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, commentsController.getComments);

router.post("/createComment/:id", ensureAuth, commentsController.createComment);

router.delete("/deleteComment/:id/:commentid", commentsController.deleteComment);



module.exports = router;