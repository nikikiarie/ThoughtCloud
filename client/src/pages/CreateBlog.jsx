import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import Navbar from "../components/Navbar";
import uploadMedia from "../helpers/uploadMedia";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateBlog = () => {
  const [message, setMessage] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user); 
  console.log("User ID:", user);


  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
  });

  useEffect(() => {
    if (!user?.token) {
      navigate('/'); // Redirect to home if logged in
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadPhoto = uploadImage ? await uploadMedia(uploadImage) : null;
    const blogData = { ...data, pic: uploadPhoto?.secure_url || "https://res.cloudinary.com/dfm1odvv4/image/upload/v1730225749/erf5k513tlscwj3fpj3b.jpg", userId: user._id, author: user.name };

    const url = `${import.meta.env.VITE_BACKEND}/api/blogs/create`;

    try {
      const res = await axios.post(url, blogData);
      console.log(res);
      setMessage(res?.data?.message || "Blog created successfully");
      setNav(true)
      if (res?.data?._id) {
        setData({
          title: "",
          description: "",
          content: "",
          coverImage: "",
        });
        navigate(`/${res.data?.authorId}/blogs`, { state: { fromCreateBlog:  user._id } });
      }
    } catch (error) {
      setMessage("Blog creation failed: " + error.message);
    }
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
  };

  const handleClearImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadImage(null);
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

      {/* Main Section */}
      <section className="text-center py-16 bg-white">
        <h1 className="text-5xl font-bold mb-4">Create a New Blog Post</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Share your thoughts and experiences with the world.
        </p>

        {/* Blog Creation Form */}
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-medium mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={data.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter blog description"
                required
              />
            </div>

            {/* Content */}
            {/* Content */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-medium mb-2"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={data.content}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 max-h-48 overflow-y-auto"
                placeholder="Write your blog content here"
                rows="6"
                required
              />
            </div>

            {/* Cover Image */}
            <div className="mb-6">
              <div>
                <label
                  htmlFor="coverImage"
                  className="text-gray-700 text-lg font-medium"
                >
                  Cover Image:
                  <div className="h-14 bg-slate-200 mt-2 flex justify-center items-center rounded border hover:border-primary">
                    <p className="text-gray-700 text-base font-medium">
                      {!uploadImage ? "Upload cover image" : uploadImage?.name}
                    </p>
                    {uploadImage && (
                      <button
                        className="text-lg ml-2 hover:text-red-600"
                        onClick={handleClearImage}
                      >
                        <IoMdCloseCircle />
                      </button>
                    )}
                  </div>
                </label>
                <input
                  className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
                  onChange={handleCoverImage}
                  type="file"
                  id="coverImage"
                  name="coverImage"
                />
              </div>
            </div>

            {/* Display success or error message */}
            {message && (
              <p className="text-center mb-4 text-indigo-600">{message}</p>
            )}

            <button
              type="submit"
              className=" mb-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Create Blog
            </button>
            
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateBlog;
