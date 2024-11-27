'use client';

import React from 'react';
import Image from 'next/image';

interface PostProps {
  username: string;
  community: string;
  title: string;
  content: string;
  commentCount: number;
  avatarUrl?: string;
}

const Post: React.FC<PostProps> = ({ username, community, title, content, commentCount, avatarUrl }) => {
  return (
    <div className='bg-white p-4 md:p-6 rounded-lg shadow-lg space-y-4 md:space-y-0 flex-row md:space-x-6 cursor-pointer'>
      <div className='flex flex-col flex-grow'>
        {/* User section */}
        <div className='flex flex-row items-center mt-2 space-x-2'>
          <img
            src={avatarUrl || '/images/placeholder.jpeg'}
            alt={`${username}'s avatar`}
            className='w-12 h-12 md:w-16 md:h-16 rounded-full'
          />
          <h4 className='font-medium text-gray-300'>{username}</h4>
        </div>

        {/* Post Content */}
        <div className='flex items-center justify-between mt-2'>
          <span className='bg-gray-badge text-badge text-sm font-medium py-1 px-3 rounded-full shadow-sm'>
            {community}
          </span>
        </div>
        <h3 className='font-bold text-lg md:text-xl mt-2 text-post'>{title}</h3>
        <p className='text-sm md:text-post text-gray-600 mt-2 line-clamp-2'>{content}</p>

        {/* Comments */}
        <div className='mt-4 flex items-center space-x-2 text-gray-500'>
          <Image src='./icons/message-circle.svg' alt='MessageCircle' width={24} height={24} />
          <span className='text-sm'>{commentCount} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
