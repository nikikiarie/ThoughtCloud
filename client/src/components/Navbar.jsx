import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";

import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice';

const Navbar = ({hideLinks, alignLeft}) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user?.token) {
        dispatch(logOut());

    } else {
      navigate('/email'); 
    }
};
  
  return (
    <div>
      <nav className={`flex ${alignLeft ?  'justify-start' : 'justify-between'} items-center py-6 px-10 bg-white shadow-md`}>
        <div className="text-2xl font-semibold"><Link to={'/'}>ThoughtCloud</Link></div>
        {!hideLinks && (
        <>
        
        <div className="space-x-4 flex items-center">
          
          <button onClick={handleClick} className="text-gray-600 hover:text-gray-800">{user.token ? "Log out" :  "Log In"}</button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"><Link to={!user.token ? "/register" : "/blog/create"}>{user.token ? "New Blog" : "Register"}</Link></button>
          
          {user?.token ? <img src={user?.profilePic} alt="profile" className="w-10 h-10 rounded-full" onClick={() => navigate(`/:${user._id}/blogs`, { state: { fromCreateBlog:  user._id } })}/> : ""}
          
        
        </div>
        </>
        )}
        
      </nav>
    </div>
  )
}

export default Navbar
