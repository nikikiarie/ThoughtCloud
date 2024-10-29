import React, { useEffect, useState } from 'react';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/postSlicce';

const BlogList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts || []);
  console.log(posts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {

        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/blogs`);
        console.log(response.data);
        // const data = response.data
        // dispatch(setPosts(data));
        const data = Array.isArray(response.data) ? response.data : []; // Ensure data is an array
        dispatch(setPosts(data));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);



  return (
    <section className="container mx-auto py-8">
      <h2 className="text-4xl font-bold mb-6">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* {posts?.map(post => (
          <Post post ={post} onClick={() => navigate("/:id/posts")} key={post._id}/>
         
        ))} */}
        {Array.isArray(posts) && posts.map((post) => (
          <Post post={post} onClick={() => navigate(`/${post._id}/posts`)} key={post._id} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;