import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setPosts } from '../path_to_your_slice/postSlice';  // Ensure you import your action
import axios from 'axios';
import Post from './Post'; // Import a Post component to display each post

const UserPostsPage = () => {
  const { userId } = useParams(); // Get user ID from URL parameters
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts); // Access posts from the Redux store

  useEffect(() => {
    // Function to fetch posts for a specific user
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`/api/posts/user/${userId}`);
        dispatch(setPosts(response.data)); // Set fetched posts in the Redux store
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [userId, dispatch]); // Rerun if userId changes

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-bold mb-6">Posts by {userId}</h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No posts found for this user.</p>
      )}
    </div>
  );
};

export default UserPostsPage;
