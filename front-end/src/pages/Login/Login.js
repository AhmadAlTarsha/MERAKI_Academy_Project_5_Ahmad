import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'
import { Register } from '../register/register'

const Login = () => {
  return (
    <div>Login <NavLink to={"/register"}>register</NavLink> <main>
   
  </main> </div>
  )
}

export default Login