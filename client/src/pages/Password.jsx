import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';
import Navbar from '../components/Navbar';

const Password = () => {
  const [data, setData] = React.useState({ password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = location?.state?.data;
 

  useEffect(() => {
    if (!location?.state?.data) {
      navigate('/email');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${import.meta.env.VITE_BACKEND}/api/auth/password`;

    try {
      const res = await axios.post(url, {
        userId: location?.state?.data?._id,
        password: data.password
      }, { withCredentials: true });

      toast.success(res?.data?.message || "User registered successfully");

      if (res?.data?.message) {
        dispatch(setToken(res?.data));
        localStorage.setItem('token', res?.data?.token);
        setData({ password: '' });
        dispatch(setUser(state));
        navigate(location?.state?.from || '/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
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
        <div className='max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg'>
          <h2 className='text-lg font-semibold text-center'>{location?.state?.name}</h2>
          <h3 className="text-center mb-4 text-lg font-medium text-gray-600">Welcome to Chat App</h3>

          <form className='grid gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
              <label htmlFor="password" className='text-gray-700 text-lg font-medium'>Password:</label>
              <input
                value={data.password}
                className='bg-gray-100 border border-gray-300 px-4 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                type="password"
                id='password'
                name='password'
                placeholder='Enter your password'
                onChange={handleChange}
                required
              />
            </div>
            <button className='bg-indigo-600 text-white text-lg px-4 leading-relaxed tracking-wide py-2 hover:bg-indigo-700 rounded mt-4'>
              Log In
            </button>
          </form>
          <p className='my-3 text-center text-gray-600'>
            New User?{" "}
            <Link to={"/forgotPassword"} className='hover:text-indigo-600 font-semibold'>
              Forgot password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Password;
