const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).lean();
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  },
  getMap: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      const comments = await Comment.find({ post: post._id }).lean();
      res.json({ post, comments });
      console.log(comments, "hello there")
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const post = await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: [],
        comments: [],
        coordinates: [req.body.lon, req.body.lat],
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.json({ post });
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findById({ _id: req.params.id })

      const userIndex = post.likes.indexOf(req.user.userName)
     
      let updatedPost
      if (userIndex === -1) {
        updatedPost = await Post.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $push: {
              likes: req.user.userName,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log("liked")
      } else {
        updatedPost = await Post.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $pull: {
              likes: req.user.userName,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log("disliked")
      }
      await updatedPost.save()
    
      res.json(updatedPost.likes);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};