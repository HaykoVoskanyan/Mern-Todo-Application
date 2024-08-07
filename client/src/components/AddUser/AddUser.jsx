import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './addUser.css'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'



export default function AddUser() {
  const users = {
    name:"",
    email:"",
    address:""
  }
  const [user, setuser] = useState(users)
  const navigate = useNavigate()

  const inputHandler = (e)=>{
    const {name,value} = e.target
    setuser({...user,[name]:value})
  }

  const submitForm = async (e)=>{
    e.preventDefault()
    await axios.post("http://localhost:3000/users/postUser",user)
    .then((res)=>{
      toast.success(res.data.message,{position:"top-right"})
      navigate("/")
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className='AddUser'>
    <Link to='/' className='custom-btn btn-2'>    <i className="fa-solid fa-backward"></i>Back</Link>
      <h3>Add New User</h3>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          name='name' 
          id="name" 
          placeholder='Enter Your Name'
          onChange={inputHandler}
        />
        <label htmlFor="email">Email</label>
          <input 
          type="email" 
          name='email' 
          id="email" 
          placeholder='Email' 
          onChange={inputHandler}
        />
        <label htmlFor="address">Address</label>
          <input 
          type="text" 
          name='address' 
          id="address" 
          placeholder='Address' 
          onChange={inputHandler}
        />
      <button type="submit" className='btn'>Submit</button>
      </form>
    </div>
  )
}

