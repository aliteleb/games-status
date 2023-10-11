import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <div>Login</div>
      <Link to="/sign-up">Sign Up</Link>
    </>
  )
}

export default Login