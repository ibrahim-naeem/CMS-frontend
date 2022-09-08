import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

interface ILoginProps {

}

const Login: FC<ILoginProps> = ({ }) => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const body = { email, password }
      const response = await fetch("http://localhost:5000/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const res = await response.json()
      localStorage.setItem('Token', res)
      navigate('/')
      console.log(res)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto flex justify-center items-center h-[100vh]">
      {/* BOX START */}
      <div className='w-1/2 border bg-white rounded py-6'>
        <div className='flex flex-col items-center'>
          <img className='w-16' src={logo} alt='' />

          <h1 className='text-lg pt-2 pb-6 text-[#CBCCD4]'>Dashboard Kit</h1>
          <h1 className='text-xl font-bold'>Login to Dashboad Kit</h1>
          <p className='text-sm py-2 text-[#CBCCD4]'>Enter your Email and Password below</p>
        </div>
        {/* FORM  START*/}
        <form className='flex justify-center' onSubmit={handleSubmit}>
          {/* Form Container Start  */}
          <div className="w-2/3 flex flex-col items-center justify-center">
            {/* Email  */}
            <div className='w-full my-2'>
              <label className="block text-xs text-slate-400 font-semibold" htmlFor="email">
                Email
              </label>
              <input onChange={e => setEmail(e.target.value)} className="border rounded my-1 py-2 px-4 w-full text-sm shadow focus:outline-none " id="email" type="email" placeholder="Email address" />
            </div>
            {/* Password  */}
            <div className='w-full my-2'>
              <label className="block text-xs text-slate-400 font-semibold" htmlFor="password">
                PASSWORD
              </label>
              <input onChange={e => setPassword(e.target.value)} className="border rounded my-1 py-2 px-4 w-full text-sm shadow focus:outline-none " id="password" type="password" placeholder="Password" />
            </div>
            {/* BUTTON */}
            <button className="w-full bg-[#3751FF] text-white font-semibold py-2 mt-2 mb-5 rounded">
              Login
            </button>
            <p>Don't have an account? <Link to="/register"><span className='text-[#3751FF] font-semibold'>Register</span> </Link></p>
          </div>
          {/* Form Container End  */}
        </form>
        {/* FORM  END*/}
      </div>
      {/* BOX START */}
    </div>

  )
};

export default Login;
