'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AddEditPostModal from './AddEditPostModal';
import { Community } from '../enums/community.enum';
import DeletePostModal from './DeleteModal';

interface PostProps {
  postId: number;
  username: string;
  community: string;
  title: string;
  content: string;
  commentCount: number;
  avatarUrl?: string;
  editable?: boolean;
}

export interface PostUser {
  id: number;
  username: string;
}

export interface PostComments {
  id: number;
  message: string;
  user: PostUser;
}
export interface PostItem {
  id: number;
  title: string;
  content: string;
  community: string;
  user: PostUser;
  comments: PostComments[];
}

const Post: React.FC<PostProps> = ({ username, postId, community, title, content, commentCount, editable = false }) => {
  const router = useRouter();

  const redirectToPostDetail = () => {
    router.replace(`/posts/${postId}`);
  };
  return (
    <div className='bg-white p-4 md:p-6 rounded-lg shadow-lg space-y-4 md:space-y-0 flex-row md:space-x-6'>
      <div className='flex flex-col flex-grow'>
        {/* User section */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <img
              src={'/images/placeholder.jpeg'}
              alt={`${username}'s avatar`}
              className='w-12 h-12 md:w-16 md:h-16 rounded-full'
            />
            <h4 className='font-medium text-gray-300'>{username}</h4>
          </div>

          {/* Editable section */}
          {editable && (
            <div className='flex space-x-4'>
              <AddEditPostModal
                isEditing={true}
                postId={postId}
                initialData={{
                  community: community as Community,
                  title,
                  content,
                }}
              />
              <DeletePostModal postId={postId} />
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className='flex items-center justify-between mt-2 '>
          <span className='bg-gray-badge text-badge text-sm font-medium py-1 px-3 rounded-full shadow-sm'>
            {community}
          </span>
        </div>
        <h3 className='font-bold text-lg md:text-xl mt-2 text-post'>{title}</h3>
        <p className='text-sm md:text-post text-gray-600 mt-2 line-clamp-2'>{content}</p>

        {/* Comments */}
        <div className='mt-4 flex items-center space-x-2 text-gray-500 cursor-pointer' onClick={redirectToPostDetail}>
          <Image src='./icons/message-circle.svg' alt='MessageCircle' width={24} height={24} />
          <span className='text-sm'>{commentCount} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
