const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authorId: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },
  pic: {
    type: String,
    required: true,
  },
  likes: {
    type: Map,
    of: Boolean,
    default: {}
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
