import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";
import Navbar from '../components/Navbar';
import uploadMedia from '../helpers/uploadMedia';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const [message, setMessage] = useState('');
  const [uploadPic, setUploadPic] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '', 
    password: '',
    profilePic: ''
  });
  console.log(data)



  useEffect(() => {
    if (user?.token) {
      navigate('/'); // Redirect to home if logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadPhoto = await uploadMedia(uploadPic);

      console.log(uploadPhoto.secure_url);
      if (uploadPhoto?.error) {
        throw new Error(uploadPhoto.error.message);
      }

      const updatedData = {
        ...data,
        profilePic: uploadPhoto?.secure_url || "https://res.cloudinary.com/dfm1odvv4/image/upload/v1730216719/zevs6gzei1dqi4bjxybi.jpg",
      };

      setData((prev) => ({ ...prev, profilePic: uploadPhoto?.secure_url || "https://res.cloudinary.com/dfm1odvv4/image/upload/v1730216719/zevs6gzei1dqi4bjxybi.jpg" }));
      const url = `${import.meta.env.VITE_BACKEND}/api/auth/register`;
      const res = await axios.post(url, updatedData);

      if (res?.data?.message) {
        setData({ name: '', email: '', password: '', profilePic: '' });
        navigate('/email');
      }
    } catch (error) {
      setMessage('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    setUploadPic(file);
  };

  const handleClearPic = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPic(null);
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar hideLinks={true} alignLeft={true}/>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <section className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-5xl font-bold mb-4">Create an Account</h1>
          <p className="text-lg text-gray-600 mb-8">Join our platform and start exploring our features.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="name">
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="profilePic" className="text-gray-700 text-lg font-medium">Profile Picture:
                <div className="h-14 bg-slate-200 mt-2 flex justify-center items-center rounded border">
                  <p className="text-gray-700">{!uploadPic ? "Upload profile photo" : uploadPic?.name}</p>
                  {uploadPic && (
                    <button className="text-lg ml-2 text-red-600" onClick={handleClearPic}>
                      <IoMdCloseCircle />
                    </button>
                  )}
                </div>
              </label>
              <input onChange={handleProfilePic} type="file" id="profilePic" name="profilePic" hidden />
              {loading && <p className="text-center text-gray-500">Uploading profile picture...</p>}
            </div>

            {message && <p className="text-center mb-4 text-indigo-600">{message}</p>}

            <button type="submit" className={`w-full py-2 px-4 rounded-md ${loading ? 'bg-indigo-400' : 'bg-indigo-600 text-white'}`}  disabled={loading}>
              {loading ? 'Creating Account...' : 'Register'}
            </button>
            <button onClick={() => navigate("/email")} className={`mt-4 border border-indigo-600 w-full py-2 px-4 rounded-md text-indigo-600 bg-white text-white'}`} >
              Log In
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
