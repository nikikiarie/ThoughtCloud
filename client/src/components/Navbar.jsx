import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = ({hideLinks, alignLeft}) => {
  const user = useSelector((state) => state.user)
  
  return (
    <div>
      <nav className={`flex ${alignLeft ?  'justify-start' : 'justify-between'} items-center py-6 px-10 bg-white shadow-md`}>
        <div className="text-2xl font-semibold"><Link to={'/'}>ThoughtCloud</Link></div>
        {!hideLinks && (
        <>
        <ul className="flex space-x-6 text-lg font-medium">
          <li><a href="#features" className="hover:text-gray-600">Features</a></li>
          <li><a href="#pricing" className="hover:text-gray-600">Pricing</a></li>
          <li><a href="#blog" className="hover:text-gray-600">Blog</a></li>
          <li><a href="#about" className="hover:text-gray-600">About</a></li>
          <li><a href="#contact" className="hover:text-gray-600">Contact</a></li>
        </ul>
        <div className="space-x-4">
          
          <button className="text-gray-600 hover:text-gray-800"><Link to={`/email`}>{user ? "Log out" :  "Log In"}</Link></button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"><Link to={!user ? "/register" : "/blog/create"}>{user ? "New Blog" : "Get Started"}</Link></button>
        </div>
        </>
        )}
      </nav>
    </div>
  )
}

export default Navbar
