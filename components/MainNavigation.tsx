'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MainNavigation = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Home', icon: '/icons/home-green.svg', path: '/' },
    { name: 'Our Blog', icon: '/icons/edit-green.svg', path: '/posts' },
  ];

  return (
    <div className='hidden md:flex flex-col bg-transparent h-full w-64 py-6 p-8'>
      <ul className='space-y-6'>
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => router.push(item.path)}
            className='flex items-center space-x-3 cursor-pointer hover:text-green-600 transition'>
            <Image src={item.icon} alt={item.name} width={24} height={24} />
            <span className='text-lg font-medium text-green-500'>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainNavigation;
