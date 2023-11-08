
const BlogPost = require('../models/blogPostModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const fs = require("fs");



exports.createPost = catchAsync(async (req, res, next) => {
    const { title, content } = req.fields;
    const { image } = req.files;

    if (!title || !content || !image) {
        return next(new AppError('Title, content, and image are required', 400));
    }

    const newPost = new BlogPost(req.fields);

    if (image) {
        newPost.image.data = fs.readFileSync(image.path);
        newPost.image.contentType = image.type;
    }


    await newPost.save();

    res.status(201).json({
        status: 'success',
        data: {
            post: newPost,
        },
    });
});



exports.getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await BlogPost.find();

    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts
        }
    });
});


exports.likePost = catchAsync(async (req, res, next) => {
    const post = await BlogPost.findById(req.params.postId);

    if (!post) {
        return next(new AppError('Post not found', 404));
    };

    post.likes += 1;
    await post.save();

    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    });
});



exports.dislikePost = catchAsync(async (req, res, next) => {
    const post = await BlogPost.findById(req.params.postId);

    if (!post) {
        return next(new AppError('Post not found', 404));
    }

    post.dislikes += 1;
    await post.save();

    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    });
});



exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await BlogPost.findByIdAndDelete(req.params.postId);

    if (!post) {
        return next(new AppError('Post not found', 404));
    };

    res.status(204).json({
        status: 'success',
        data: null
    });
});


exports.blogPostImage = catchAsync(async (req, res, next) => {

    const image = await BlogPost.findById(req.params.pid).select("image");

    if (!image) {
        return next(new AppError('Image not found', 404));
    }

    res.set("Content-type", image.image.contentType);
    res.status(200).send(image.image.data);

});
