'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const TopBar = () => {
  const { isSignedIn, userName, signOut } = useAuth();

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickSignOut = () => {
    setIsMenuOpen(false);
    signOut();
  };

  const onClickSignInRedirect = () => {
    router.push('/sign-in');
  };

  const UserProfile = () => {
    return (
      <div className='hidden md:flex items-center space-x-4'>
        {isSignedIn ? (
          <div className='flex items-center space-x-4'>{UserProfileItem()}</div>
        ) : (
          <Button onClick={() => onClickSignInRedirect()}>Sign In</Button>
        )}
      </div>
    );
  };

  const UserProfileItem = () => {
    return (
      <>
        <span>{userName}</span>
        <img src='./images/placeholder.jpeg' alt='User Profile' className='w-8 h-8 rounded-full' />
        <Button variant='secondary' onClick={() => onClickSignOut()}>
          Sign Out
        </Button>
      </>
    );
  };

  const HamburgerButton = () => {
    return (
      <div className='md:hidden flex items-center'>
        <button
          className='text-white focus:outline-none'
          onClick={() => setIsMenuOpen(true)} // Open the menu
        >
          <Image src='./icons/menu.svg' alt='Menu' width={24} height={24} />
        </button>
      </div>
    );
  };

  const HamburgerMenu = () => {
    return (
      <div className='fixed inset-0 z-40 flex'>
        <div
          className='w-1/4 h-full bg-black bg-opacity-50'
          onClick={() => setIsMenuOpen(false)} // Clicking the overlay closes the menu
        ></div>
        <div className='fixed top-0 right-0 h-full w-3/4 bg-green-500 text-white flex flex-col z-40 rounded-lg'>
          <button
            className='text-white self-start p-4 focus:outline-none'
            onClick={() => setIsMenuOpen(false)} // Close the menu
          >
            <Image src='./icons/left-arrow.svg' alt='Menu' width={24} height={24} />
          </button>

          <div className='flex items-center space-x-4 ml-auto px-6'>
            {isSignedIn ? (
              <div className='flex items-center text-xl space-x-4'>{UserProfileItem()}</div>
            ) : (
              <button
                className='bg-green-600 px-4 py-2 rounded-lg hover:bg-green-400'
                onClick={() => router.push('/sign-in')}>
                Sign In
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className='flex flex-col items-start space-y-6 px-6 mt-6'>
            <button
              className='flex items-center space-x-4 text-xl hover:text-green-300'
              onClick={() => {
                router.push('/');
                setIsMenuOpen(false);
              }}>
              <Image src='./icons/home-line.svg' alt='Home Menu' width={24} height={24} />
              <span>Home</span>
            </button>

            <button
              className='flex items-center space-x-4 text-xl hover:text-green-300'
              onClick={() => {
                router.push('/posts');
                setIsMenuOpen(false);
              }}>
              <Image src='./icons/edit.svg' alt='Edit Menu' width={24} height={24} />
              <span>Our Blog</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='bg-green-500 text-white px-4 py-3 flex items-center justify-between sticky top-0'>
      {/* Left: Logo */}
      <div className='text-2xl font-bold cursor-pointer' onClick={() => router.push('/')}>
        a Board
      </div>

      {/* Hamburger Button */}
      {HamburgerButton()}

      {/* Right: Sign In / User Info */}
      {UserProfile()}

      {isMenuOpen && HamburgerMenu()}
    </div>
  );
};

export default TopBar;
