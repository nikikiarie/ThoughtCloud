const express = require('express');
const register = require('../controllers/register');
const email_check = require('../controllers/email');
const password = require('../controllers/password');
const { createBlog, updateBlog, likeBlog, getBlog, deleteBlog, getAllBlogs, addComment, getAllComments, getBlogById, likeBlogPost, getBlogsByUserId
  } = require('../controllers/blog'); // Import the 
const { getUserById } = require('../controllers/user');

const router = express.Router();

router.post('/auth/register',register);

router.post('/auth/email',email_check)

router.post("/auth/password",password);

router.post('/blogs/create', createBlog);

router.get('/users/:userId', getUserById);

router.get('/blogs/:userId', getBlogsByUserId);

router.post('/blogs/:blogId/like', likeBlogPost);

// router.get('/blogs/:id', getBlog);

// router.delete('/blogs/:id', deleteBlog);

router.get('/blogs', getAllBlogs);

router.get('/blogs/:blogId', getBlogById);

// router.post('/blogs/:id/comments', addComment);

// router.get('/blogs/:id/comments', getAllComments)


module.exports = router;
