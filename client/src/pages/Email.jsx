import React from 'react'
import { TbUserScreen } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import uploadMedia from '../helpers/uploadMedia';
import axios from 'axios';
import toast from 'react-hot-toast'


const Email = () => {
  const [data, setData] = React.useState({
    email: '',
  })


  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const url = `${import.meta.env.VITE_BACKEND}/api/auth/email`

    try {
      const res = await axios.post(url, data)
      console.log(res)
      toast.success(res?.data?.message || "User registered successfully")

      if (res?.data?.message) {
        setData({
          email: '',
        })
        navigate('/password', {state: {data: res?.data?.data}})
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
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
      <div className='mx-auto bg-white w-full mx:2 p-4 max-w-sm rounded overflow-hidden'>
        <div>
          <TbUserScreen className='mx-auto text-5xl text-primary'/>
        </div>
        <h3>Welcome to Chat App</h3>

        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email :</label>
            <input value={data.email} className='bg-slate-100 px-2 py-1 focus:outline-primary' type="email" id='email' name='email' placeholder='Enter your email' onChange={handleChange}/>
          </div>
          <button className='bg-primary text-lg px-4 leading-relaxed tracking-wide py-1 hover:bg-sec rounded mt-4'>Log In</button>
        </form>
        <p className='my-3 text-center'>New User?<Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
      </div>
    </div>
  )
}

export default Email
