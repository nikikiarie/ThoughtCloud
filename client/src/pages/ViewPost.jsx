import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { LuHeart } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLikeAsync } from '../redux/postSlicce';
import Footer from '../components/Footer';

const ViewPost = () => {
  const { postId } = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.posts);

  const post = posts.find((p) => p._id === postId);
    // const {path} = location.pathname;

  const isLiked = post?.likes && post.likes[user._id];
  const likeCount = post?.likes ? Object.keys(post.likes).length : 0;

  const handleLike = () => {
    user?.token ? dispatch(toggleLikeAsync({ postId: post._id, userId: user._id })) : navigate('/email', { state: { fromPost: location.pathname } });

    
  };
  
  

  const handleGoBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="text-center py-16 bg-white">
        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : post ? (
          <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-4">
              by {post.author} on {new Date(post?.datePublished).toLocaleDateString()}
            </p>

            {post.pic && (
              <div className="mb-6">
                <img
                  src={post.pic}
                  alt="Post cover"
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            )}

            <div className="text-gray-700 text-lg leading-relaxed mb-4">
              {post.content}
            </div>

            {/* Like button and count section */}
            <div className="flex items-center font-medium text-lg mt-2">
              <div className="ml-auto justify-center items-center px-6 flex">
                <LuHeart
                  onClick={handleLike}
                  className={`cursor-pointer ${isLiked ? 'fill-current' : ""} ${isLiked ? 'text-red-500' : 'text-gray-900'}`}
                />
                <span className="ml-2 text-gray-700">
                  {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
                </span>
              </div>
            </div>

            {/* Go Back button */}
            <button
              onClick={handleGoBack}
              className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Go Back
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading post...</p>
        )}
      </section>
      <Footer/>
    </div>
  );
};

export default ViewPost;
