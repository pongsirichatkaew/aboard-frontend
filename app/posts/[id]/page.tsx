'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Mock Data
const mockPost = {
  id: 1,
  title: 'The Big Short War',
  content:
    'Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid other kids loved to hate...',
  category: 'History',
  user: { username: 'Zach', avatarUrl: '/images/placeholder.jpeg' },
  timestamp: '5mo',
};

const mockComments = [
  {
    id: 1,
    message: 'Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium.',
    user: { username: 'Wittawat98', avatarUrl: '/images/placeholder.jpeg' },
    timestamp: '12h',
  },
  {
    id: 2,
    message: 'Tristique auctor sed semper nibh odio iaculis sed aliquet.',
    user: { username: 'Hawaii51', avatarUrl: '/images/placeholder.jpeg' },
    timestamp: '1mo',
  },
  {
    id: 3,
    message: 'Amet mollis eget morbi feugiat mi risus eu.',
    user: { username: 'Helo_re', avatarUrl: '/images/placeholder.jpeg' },
    timestamp: '3mo',
  },
  {
    id: 4,
    message: 'Tortor sed sagittis convallis auctor.',
    user: { username: 'Azc123', avatarUrl: '/images/placeholder.jpeg' },
    timestamp: '4mo',
  },
];

const PostDetailsPage = () => {
  const router = useRouter();

  return (
    <div className='container mx-auto px-4 py-6 bg-white'>
      {/* Back Button */}
      <button onClick={() => router.push('/posts')} className='mb-4 text-green-600 hover:underline'>
        ← Back to Posts
      </button>

      {/* Post Section */}
      <div className='bg-white shadow rounded-lg p-6 mb-6'>
        <div className='flex items-center space-x-4 mb-4'>
          <img src={mockPost.user.avatarUrl} alt={mockPost.user.username} className='w-12 h-12 rounded-full' />
          <div>
            <h2 className='text-lg font-semibold'>{mockPost.user.username}</h2>
            <p className='text-sm text-gray-500'>{mockPost.timestamp} ago</p>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <span className='bg-gray-100 text-gray-600 text-sm font-medium py-1 px-3 rounded-full'>
            {mockPost.category}
          </span>
        </div>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>{mockPost.title}</h1>
        <p className='text-gray-700'>{mockPost.content}</p>
      </div>

      {/* Comments Section */}
      <div className='bg-white shadow rounded-lg p-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Comments</h2>
        <button className='bg-green-600 text-white py-2 px-4 rounded hover:bg-green-400 mb-6'>Add Comments</button>
        {mockComments.length > 0 ? (
          <ul className='space-y-4'>
            {mockComments.map((comment) => (
              <li key={comment.id} className='flex items-start space-x-4'>
                <img src={comment.user.avatarUrl} alt={comment.user.username} className='w-10 h-10 rounded-full' />
                <div>
                  <div className='flex justify-between'>
                    <h3 className='text-sm font-semibold'>{comment.user.username}</h3>
                    <p className='text-xs text-gray-500'>{comment.timestamp} ago</p>
                  </div>
                  <p className='text-gray-600'>{comment.message}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default PostDetailsPage;
