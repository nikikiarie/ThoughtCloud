import React, { useEffect } from 'react';
import { TbUserScreen } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Email = () => {
  const [data, setData] = React.useState({ email: '' });
  const navigate = useNavigate();
  const location = useLocation();


  const fromPost = location.state?.fromPost;
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.token) {
      navigate('/'); // Redirect to home if logged in
    }
  }, [navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${import.meta.env.VITE_BACKEND}/api/auth/email`;

    try {
      const res = await axios.post(url, data);
      toast.success(res?.data?.message || "User registered successfully");

      if (res?.data?.message) {
        setData({ email: '' });
        navigate('/password', { state: { data: res?.data?.data } });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar hideLinks={true} alignLeft={true} />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]"> {/* Adjust min-height if navbar has specific height */}
        <section className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center">Welcome Back</h1>
          {fromPost && (
            <p className="text-lg text-indigo-600 text-center mb-4 font-medium">
              Log in to like a post!
            </p>
          )}
          <p className="text-lg text-gray-600 text-center mb-4 font-medium">
            Enter your email to log in
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="email">
                
              </label>
              <input
                type="email"
                id="email"
                name='email'
                onChange={handleChange}
                value={data.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Log In
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            New User?{" "}
            <Link to="/register" className="text-indigo-600 font-medium hover:text-indigo-800">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Email;
