const Comment = require ("../models/Comment")
const Post = require("../models/Post");

module.exports = {
  getComments: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id ).lean();
      const comments = await Comment.find({post: post._id})
      console.log(comments, "controller")
      res.json(comments);
    } catch (err) {
      console.log(err);
    }
  },
 createComment: async (req, res) => {
  try {
      
      const comment = await Comment.create({
        post: req.params.id,
        text: req.body.text,
       createdBy: req.user.ObjectId,
       parentId: req.params.parentId,
       children: [],
      });
      console.log("Comment has been added!");
      res.json({ comment });
    } catch (err) {
      console.log(err);
    }
  },
  
  deleteComment: async (req, res) => {
    try {
      await Comment.remove({ _id: req.params.commentid});
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};