import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setPosts } from '../redux/postSlicce';
import axios from 'axios';
import Post from '../components/Post';
import Navbar from '../components/Navbar';

const UserPostsPage = () => {
  const [userName, setUserName] = useState("");
  const { userId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  const userPosts = posts.filter(post => post.authorId === userId);
  console.log(posts)

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        console.log(userId);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/users/${userId}`);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-8">
      {/* Navbar */}
      <Navbar />

      {/* User Posts Section */}
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl text-s font-semibold mb-4 text-gray-900"> {userName} Posts</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Explore the collection of posts contributed by this user, covering a range of topics and insights.
        </p>

        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userPosts.map(post => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-8">No posts found for this user.</p>
        )}
      </section>
    </div>
  );
};

export default UserPostsPage;
