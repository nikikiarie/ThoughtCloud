import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ViewPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/blogs/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError('Unable to load post.');
      }
    };

    fetchPost();
  }, [postId]);

  const handleGoBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar hideLinks={true} alignLeft={true} />

      <section className="text-center py-16 bg-white">
        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : post ? (
          <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-4">by {post.author} on {new Date(post.date).toLocaleDateString()}</p>

            {post.image && (
              <div className="mb-6">
                <img
                  src={post.image}
                  alt="Post cover"
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            )}

            <div className="text-gray-700 text-lg leading-relaxed mb-4">
              {post.content}
            </div>

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
    </div>
  );
};

export default ViewPost;
