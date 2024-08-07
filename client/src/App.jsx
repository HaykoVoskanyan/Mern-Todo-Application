import React from 'react'
import {createBrowserRouter,RouterProvider,Route,Link, createRoutesFromElements,
} from "react-router-dom";
import User from './components/UserPage/User';
import AddUser from './components/AddUser/AddUser';
import UpdateUser from './components/UpdateUser/UpdateUser';
import './App.css'


export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<User/>}/>
      <Route path="/adduser" element={<AddUser />}/>
      <Route path="/updateUser/:id" element={<UpdateUser/>}/> 

    </>
  )
)
  return (
    <div className='App'>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  )
}
