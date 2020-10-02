const { Router } = require("express");
const router = Router();
const Post = require("../models/Post");

//get back all the posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
//SUBMIT a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
//specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
//delete post
router.delete("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const removedPost = await Post.findByIdAndDelete(postId);
    if (removedPost) {
      return res.status(200).send({ message: "post deleted" });
    }
  } catch (err) {
    res.json({ message: err });
    next(error);
  }
});
//update a post
router.patch("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.status(200).send(updatedPost);
  } catch (err) {
    res.json({ message: err });
    next(error);
  }
});

module.exports = router;
