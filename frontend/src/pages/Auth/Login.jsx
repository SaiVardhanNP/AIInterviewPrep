import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {updateUser}=useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault(); 

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if(!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError("")

    try{
        const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
          email,
          password
        })
        const {token}=response.data;

        if(token){
          localStorage.setItem("token",token);
          updateUser(response.data);
          navigate("/dashboard");
        }
    }
    catch(err){
      if(err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred. Please try again.");
      }
      else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-bold text-black'>Welcome Back</h3>
      <p className='text-xs font-bold text-slate-700 mt-[5px] mb-6'>
        Please enter your credentials to login.
      </p>
      <form onSubmit={handleLogin}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='vardhan@gmail.com' label='Email' className='mb-4' />
        <Input type="password" value={password} placeholder="Min 8 Characters" label="Password" onChange={(e) => setPassword(e.target.value)}/>

        {
          error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>
        }
        <button type='submit' className='btn-primary'>LOGIN</button>
        <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{" "} <button className='font-medium text-primary underline cursor-pointer' onClick={()=>{setCurrentPage("signup")}}>SignUp</button></p>
      </form>
    </div>

    )
  
}

export default Login
