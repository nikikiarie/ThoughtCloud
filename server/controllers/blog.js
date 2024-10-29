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
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
};

// Retrieve a single blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog post' });
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

module.exports = {
  createBlog,
  updateBlogById,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  searchBlogs,
};
