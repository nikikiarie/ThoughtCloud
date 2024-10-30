import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import Navbar from '../components/Navbar';

const UserPostsPage = () => {
  const [userName, setUserName] = useState("");
  const { userId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = useState(false);
  const [newData, setNewData] = useState([]);
  const user = useSelector(state => state.user);
  const isNavigatingFromCreateBlog = location?.state?.fromCreateBlog;
  
  const posts = useSelector(state => state.posts.posts);
  const userPosts = posts.filter(post => post.authorId === userId);

  useEffect(() => {
    if (isNavigatingFromCreateBlog !== undefined) {
      setData(isNavigatingFromCreateBlog);
    }
  }, [isNavigatingFromCreateBlog]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/users/${userId}`);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserName();
  }, [userId]);

  useEffect(() => {
    const fetchTruePosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/blogs/${userId}`);
        setNewData(res.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
    fetchTruePosts();
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-8">
      <Navbar />

      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">{newData && user?.token ? "My" : userName} Posts</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Explore the collection of posts contributed by this user, covering a range of topics and insights.
        </p>

        {isNavigatingFromCreateBlog ? (
          newData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newData.map(post => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-8">No new posts found for this user.</p>
          )
        ) : userPosts.length > 0 ? (
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
