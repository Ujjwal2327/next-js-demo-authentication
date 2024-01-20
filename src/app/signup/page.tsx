'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function SignupPage() {

  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
      setButtonDisabled(false);
    else
      setButtonDisabled(true);
  }, [user]);

  const onSignup = async () => {

    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('signup success', response.data);
      toast.success('Signup success');
      router.push('/login');
    }
    catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error("Signup failed");
    }
    finally {
      setLoading(false);
    }

  }

  return (

    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Signup</h1>
      <hr />

      <label htmlFor="username">username</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 bg-black text-white'
        type="text"
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
      />

      <label htmlFor="email">email</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 bg-black text-white'
        type="email"
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />

      <label htmlFor="password">password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 bg-black text-white'
        type="password"
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />

      <button
        className='p-2 border rounded-lg mb-4'
        onClick={onSignup}
      >
        {buttonDisabled ? "Enter Valid Details" : (loading ? "Loading..." : "Signup Here")}
      </button>

      <Link href='/login'>Visit Login Page</Link>

    </div>

  )

}