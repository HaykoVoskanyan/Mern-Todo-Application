import React, { useEffect, useState } from 'react'
import './updateUser.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

export default function UpdateUser() {
  const users = {
    name:"",
    email:"",
    address:""
  }
  const [user, setuser] = useState(users)
  const navigate = useNavigate()
  const {id} = useParams()

  const inputHandler = (e)=>{
    const {name,value} = e.target
    setuser({...user,[name]:value})
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
    .then((res)=>{
      setuser(res.data.data)
    })
    .catch((error)=>{
      console.log(error);
      toast.error("Failed to fetch user data");
     })
  }, [id])
  
  const submitForm = async (e)=>{
    e.preventDefault()
    await axios.put(`http://localhost:3000/users/update/${id}`,user)
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
      <h3>Update User</h3>
      <form onSubmit={submitForm}>
      <label htmlFor="name">Name</label>
        <input 
          type="text" 
          name='name' 
          id="name" 
          value={user.name}
          onChange={inputHandler}
        />
        <label htmlFor="email">Email</label>
          <input 
          type="email" 
          name='email' 
          id="email" 
          value={user.email}
          onChange={inputHandler}
        />
        <label htmlFor="address">Address</label>
          <input 
          type="text" 
          name='address' 
          id="address" 
          value={user.address}
          onChange={inputHandler}
        />
      <button type="submit" className='btn'>Submit</button>
      </form>
    </div>
  )
}
