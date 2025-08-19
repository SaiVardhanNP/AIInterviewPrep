import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({setCurrentPage}) => {
  const [profilePic,setProfilePic]=useState(null);
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);
  const navigate=useNavigate();
    const {updateUser}=useContext(UserContext);
  

  const handleSignup=async (e)=>{
    e.preventDefault();
  
  let profileImageUrl="";
  if(!fullName){
    setError("Full name is required.");
    return;
  }
  if(!email || !validateEmail(email)){
    setError("Please enter a valid email address.");
    return;
  }
  if(!password || password.length < 8){
    setError("Password must be at least 8 characters long.");
    return;
  }
  setError("");
  try{
        if(profilePic){
          const imgUploadRes=await uploadImage(profilePic);
          profileImageUrl=imgUploadRes.imageUrl || "";
        }
        const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
          name:fullName,
          email,
          password,
          profileImageUrl
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
      <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by enter your detail below
      </p>

      <form onSubmit={handleSignup}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input value={fullName} onChange={({target})=>setFullName(target.value)} placeholder="Sai Vardhan" label="Full Name" type="text"/>
          <Input value={email} onChange={({target})=>setEmail(target.value)} placeholder="vardhan@gmail.com" label="Email" type="email"/>
          <Input value={password} onChange={({target})=>setPassword(target.value)} placeholder="********" label="Password" type="password"/>
        </div>

        {
          error && <p className='text-red-500 text-md pb-2.5'>{error}</p>
        }

        <button type="submit" className='btn-primary'>SIGN UP</button>

        <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}<button className='font-medium text-primary underline cursor-pointer' onClick={()=>{setCurrentPage("login")}}>Login</button></p>
      </form>
    </div>
  )
}

export default SignUp
