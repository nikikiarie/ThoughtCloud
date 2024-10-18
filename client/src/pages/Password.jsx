import React, { useEffect } from 'react'
import { TbUserScreen } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'


const Password = () => {
  const [data, setData] = React.useState({
    password: '',
  })

  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.state)

  useEffect(() => {
    if(!location?.state?.data){
      navigate('/email')
    }
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const url = `${import.meta.env.VITE_BACKEND}/api/auth/password`

    console.log(location)

    try {
      const res = await axios.post(url, { 
        userId: location?.state?.data?._id,
        password: data.password
      },{withCredentials: true})

      toast.success(res?.data?.message || "User registered successfully")

      if (res?.data?.message) {
        setData({
          password: '',
        })
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong")
      console.log(error)
      
    }
  }

  
 

  const handleChange = (e) => {
    setData((prev) =>{
      return{
      ...prev,
      [e.target.name]: e.target.value
    }})
  }


  return (
    <div className='mt-5'>
      <div className='mx-auto bg-white w-full mx:2 p-4 max-w-md rounded overflow-hidden'>
        <div>
          {/* <TbUserScreen width={70} height={70} name={location?.state?.name} imageUrl={location?.state?.profilePic}/> */}
          <h2 className='semi-bold text-lg p-1'>{location?.state?.name}</h2>
          {/* <TbUserScreen className='mx-auto text-5xl text-primary'/> */}
        </div>
        <h3>Welcome to Chat App</h3>

        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="password">Password :</label>
            <input value={data.password} className='bg-slate-100 px-2 py-1 focus:outline-primary' type="password" id='password' name='password' placeholder='Enter your password' onChange={handleChange} required/>
          </div>
          <button className='bg-primary text-lg px-4 leading-relaxed tracking-wide py-1 hover:bg-sec rounded mt-4'>Log In</button>
        </form>
        <p className='my-3 text-center'>New User?<Link to={"/forgotPassword"} className='hover:text-primary font-semibold'>Forgot password</Link></p>
      </div>
    </div>
  )
}

export default Password
