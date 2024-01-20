"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function ProfilePage() {

  const router = useRouter();
  const [userId, setUserId] = useState<string>('');

  const logout = async()=>{
    try{
      await axios.get('/api/users/logout');
      toast.success("logout successfully");
      router.push('/login');
    }
    catch(error:any){
      toast.error("logout failed");
      console.log(error.message);
    }
  }

  const getUserDetails = async()=>{
    try{
      const response = await axios.get('/api/users/me');
      setUserId(response.data.user._id);
      console.log(response.data.user._id);
    }
    catch(error:any){
      console.log(error.message);
    }
  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2>{userId==='' ? "Nothing" : <Link href={`/profile/${userId}`}>{userId}</Link> }</h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        get user details
      </button>
    </div>

  )

}