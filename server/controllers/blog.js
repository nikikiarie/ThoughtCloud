const Blog = require('../models/Blog');

// Create a new blog post
const createBlog = async (req, res) => {
  console.log(req.body)
  try {
    const { title, author, content, description, pic} = req.body;

    const blog = new Blog({ title, author, pic, content , description, authorId: req.body.userId, author: req.body.author });
    const savedBlog = await blog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
};

// Retrieve all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    console.log(blogs)
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
};

// Retrieve a single blog post by ID
const getBlogById = async (req, res) => {
  console.log(req.params)
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog post' });
  }
};
const getBlogsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const blogs = await Blog.find({ authorId: userId });

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found for this user.' });
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user\'s blog posts' });
  }
};


// Update a blog post by ID
const updateBlogById = async (req, res) => {
  try {
    const { title, author, content } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, content },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
};

// Delete a blog post by ID
const deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
};

// Search blog posts by title or author
const searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search blog posts' });
  }
};

const likeBlogPost = async (req, res) => {


  try {
    // Extract postId from the URL parameters and userId from the request body
    const postId = req.params.blogId;
    const { userId } = req.body; 

    const blog = await Blog.findById(postId);
    if (!blog) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Toggle like status
    if (blog.likes.get(userId)) {
      blog.likes.delete(userId);
    } else {
      blog.likes.set(userId, true);
    }

    await blog.save();
    res.status(200).json({ postId, likes: Object.fromEntries(blog.likes) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const unlikeBlogPost = async (req, res) => {
  const { blogId } = req.params; 
  const { userId } = req.body; 

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the user has not liked the post
    if (!blog.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have not liked this post yet' });
    }

    // Remove user ID from the likes array
    blog.likes = blog.likes.filter(id => id !== userId);
    await blog.save();

    res.status(200).json({ message: 'Blog post unliked', likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  updateBlogById,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  searchBlogs,
  likeBlogPost,
  unlikeBlogPost,
  getBlogsByUserId
};
