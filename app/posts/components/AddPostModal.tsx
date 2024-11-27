'use client';

import { PostRequest } from '@/api/post/dtos/post-request.dto';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { usePosts } from '@/contexts/PostContext';
import React, { useState } from 'react';
import { Community } from '../enums/community.enum';

const AddPostModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { addPost } = usePosts();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPost: PostRequest = {
      community: formData.get('community') as Community,
      title: formData.get('title')?.toString() ?? '',
      content: formData.get('content')?.toString() ?? '',
    };

    await addPost(newPost);
    handleClose(); // Close modal after submission
  };

  return (
    <div>
      {/* Add Post Button */}
      <Button onClick={handleOpen}>Add Post</Button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleClose} title='Create Post'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Dropdown for Community */}
          {/* TODO: */}
          <div>
            <select name='community' className='w-full border border-gray-300 rounded-lg px-3 py-2'>
              <option value=''>Choose a community</option>
              <option value='History'>History</option>
              <option value='community2'>Community 2</option>
            </select>
          </div>

          {/* Title Input */}
          <div>
            <input
              name='title'
              type='text'
              placeholder='Title'
              className='w-full border border-gray-300 rounded-lg px-3 py-2'
            />
          </div>

          {/* Content Textarea */}
          <div>
            <textarea
              name='content'
              placeholder="What's on your mind..."
              className='w-full border border-gray-300 rounded-lg px-3 py-2'
              rows={4}
            />
          </div>

          {/* Modal Footer */}
          <div className='flex justify-end space-x-4'>
            <Button onClick={handleClose} variant='border-green'>
              Cancel
            </Button>
            <Button type='submit'>Post</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddPostModal;
