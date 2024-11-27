'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return alert('Please enter a username!');

    try {
      await signIn(username);
      router.push('/'); // Redirect to home after signing in
    } catch (error) {
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className='flex min-h-screen bg-green-500'>
      {/* Left Section: Sign-In Form */}
      <div className='w-3/5 bg-green-500 flex flex-col justify-center items-start px-32'>
        <h1 className='text-4xl font-bold text-white mb-6'>Sign in</h1>
        <form onSubmit={handleSubmit} className='w-full max-w-md space-y-6'>
          {/* Username Input */}
          <div>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>
          {/* Sign In Button */}
          <button
            type='submit'
            className='w-full bg-green-600 px-4 py-2 rounded-lg hover:bg-green-400 text-white transition'>
            Sign In
          </button>
        </form>
      </div>

      {/* Right Section: Landing Image */}
      <div className='w-2/5 bg-green-300 flex justify-center items-center rounded-xl'>
        <img src='/images/aboard-landing.png' alt='Aboard Landing' className='w-1/2 h-auto object-cover' />
      </div>
    </div>
  );
};

export default SignInPage;
