import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import BlogList from '../components/BlogList'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'

const Home = () => {
   const location = useLocation()
   const dispatch = useDispatch()
   const data = location?.state

   const user = useSelector((state) => state.user)
    console.log({...user})
  
   useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);
  

  console.log(location?.state?.data)
  return (
    <>
    <div className="min-h-screen bg-white px-8">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <section className="text-center py-16 bg-white">
        <h1 className="text-5xl font-bold mb-4">Discover Fresh Perspectives and Ideas</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
        Explore our latest posts and join the conversation on today’s trending topics, insights, and stories shared by our community.
        </p>

        {/* Blog Post Cards */}
        <BlogList />
        
      </section>
      
    </div>
    <Footer/>
    </>
  );
}

export default Home
