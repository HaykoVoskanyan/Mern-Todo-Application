import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './User.css'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function User() {
  const [user, setUser] = useState([])
  useEffect(() => {
   const fetchData = async ()=>{
    const response = await axios.get("http://localhost:3000/users")
      setUser(response.data.data)
   }
   fetchData()
  }, [])

  const handleDelete = async (userId)=>{
    await axios.delete(`http://localhost:3000/users/delete/${userId}`)
    .then((res)=>{
      const data = user.filter((elm)=>elm._id !== userId)
      setUser(data)
      toast.success(res.data.message,{position:"top-right"})
    })
  }
  
  return (
    <div className='User'>
      <Link to='/addUser'className='add_user'>Add User <i className="fa-solid fa-user-plus"></i></Link>
      {
        user.length === 0 ? (
          <>
            <h3>No Data To Display</h3>
            <p>Please Add New User</p>
          </>
        ):(
           <table>
        <thead>
          <tr>
            <th>N1</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        
          {
            user.map((elm,ind)=>{
              return(
              <tbody key={elm._id}>
              <tr>
                <td>{ind + 1}</td>
                <td>{elm.name}</td>
                <td>{elm.email}</td>
                <td>{elm.address}</td>
                <td>
            <Link to={`/updateUser/` + elm._id} type='button' style={{color:"rgb(82, 244, 84)"}}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <button onClick ={()=>handleDelete(elm._id)} style={{color:"rgb(231, 62, 62)", border:"none", backgroundColor:"white", cursor:"pointer"}}>
              <i className="fa-solid fa-trash"></i>
            </button>
            </td>
             </tr>
             </tbody>
              )
            })
          }
      </table>
        )
      }
     
    </div>
  )
}
