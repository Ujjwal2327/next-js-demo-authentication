'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function LoginPage() {

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0)
      setButtonDisabled(false);
    else
      setButtonDisabled(true);
  }, [user]);

  const onLogin = async ()=>{

    try{
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log(response);
      toast.success('Login success');
      router.push(`/profile/${user.email}`);
    }
    catch(error:any){
      console.log('login failed', error.message);
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }

  }

  return (
    
    // this is best
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Login</h1>
      <hr />      
      <label htmlFor="email">email</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 bg-black text-white'
        type="email"
        id='email'
        value={user.email}
        onChange={(e)=>setUser({...user, email:e.target.value})}
        placeholder='email'
      />
      
      <label htmlFor="password">password</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 bg-black text-white'
        type="password"
        id='password'
        value={user.password}
        onChange={(e)=>setUser({...user, password:e.target.value})}
        placeholder='password'
      />

      <button
        className='p-2 border rounded-lg mb-4'
        onClick={onLogin}
      >
        {buttonDisabled ? "Enter Valid Details" : (loading ? "Loading..." : "Login Here")}
      </button>

      <Link href='/signup'>Visit Signup Page</Link>

    </div>

)

}