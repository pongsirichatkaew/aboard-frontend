'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Image from 'next/image';
import Post, { PostItem } from '../components/PostCard';
import { usePosts } from '@/contexts/PostContext';
import { usePathname } from 'next/navigation';

const PostDetailsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [post, setPost] = useState<PostItem>({
    id: 0,
    title: '',
    content: '',
    community: '',
    user: {
      id: 0,
      username: '',
    },
    comments: [],
  });
  const { fetchPostById } = usePosts();

  useEffect(() => {
    const getPostById = async () => {
      const postId = pathname.replaceAll('/posts/', '');
      const postData = await fetchPostById(postId);
      setPost(postData);
    };
    getPostById();
  }, [pathname]);

  return (
    <div className='container mx-auto px-4 py-6 bg-white min-h-screen'>
      {/* Back Button */}
      <Button variant='green-back' onClick={() => router.push('/posts')}>
        <Image className='cursor-pointer' src='./icons/left-arrow.svg' alt='Back Menu' width={24} height={24} />
      </Button>

      {/* Post Section */}
      <Post
        postId={post.id}
        username={post.user.username}
        community={post.community}
        title={post.title}
        content={post.content}
        commentCount={post.comments.length}
      />

      {/* Comments Section */}
      <div className='bg-white rounded-lg p-6'>
        <Button variant='border-green'>Add Comments</Button>
        {post.comments.length > 0 ? (
          <ul className='space-y-4 p-3'>
            {post.comments.map((comment) => (
              <li key={comment.id} className='flex items-start space-x-4'>
                <img
                  src={'/images/placeholder.jpeg'}
                  alt={`${comment.user.username}'s avatar`}
                  className='w-10 h-10 md:w-14 md:h-14 rounded-full'
                />
                <div>
                  <div className='flex justify-between'>
                    <h3 className='text-sm font-semibold'>{comment.user.username}</h3>
                  </div>
                  <p className='text-gray-600'>{comment.message}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500 mt-3'>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default PostDetailsPage;
