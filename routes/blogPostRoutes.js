
const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const formidable = require("express-formidable");


const router = express.Router();

router.post('/', formidable(), blogPostController.createPost);
router.get('/', blogPostController.getAllPosts);
router.put('/like/:postId', blogPostController.likePost);
router.put('/dislike/:postId', blogPostController.dislikePost);
router.delete('/:postId', blogPostController.deletePost);
router.get("/post-image/:pid", blogPostController.blogPostImage);


module.exports = router;