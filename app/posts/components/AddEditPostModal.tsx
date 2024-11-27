'use client';

import { PostRequest } from '@/api/dtos/post-request.dto';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useError } from '@/contexts/ErrorContext';
import { usePosts } from '@/contexts/PostContext';
import React, { useState } from 'react';
import { Community } from '../enums/community.enum';
import Image from 'next/image';
interface AddEditPostModalProps {
  isEditing?: boolean;
  initialData?: PostRequest;
  postId?: number;
}

const AddEditPostModal: React.FC<AddEditPostModalProps> = ({
  isEditing = false,
  initialData = { community: '', title: '', content: '' },
  postId,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { editPost, addPost } = usePosts();
  const { setError } = useError();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const post: PostRequest = {
      community: formData.get('community') as Community,
      title: formData.get('title')?.toString() ?? '',
      content: formData.get('content')?.toString() ?? '',
    };

    if (isEditing) {
      if (!postId) {
        setError('postId is required for editing');
        return;
      }
      await editPost(postId, post);
    } else {
      await addPost(post);
    }
    handleClose();
  };

  return (
    <div>
      {/* Button to Open Modal */}
      {isEditing ? (
        <Image
          className='cursor-pointer'
          src='./icons/pencil.svg'
          onClick={handleOpen}
          alt='Edit Menu'
          width={24}
          height={24}
        />
      ) : (
        <Button className='cursor-pointer' onClick={handleOpen}>
          {'Add Post'}
        </Button>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleClose} title={isEditing ? 'Edit Post' : 'Create Post'}>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Dropdown for Community */}
          <div>
            <select
              name='community'
              className='w-full border border-gray-300 rounded-lg px-3 py-2'
              defaultValue={initialData.community}>
              <option value=''>Choose a community</option>
              {Object.entries(Community).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Title Input */}
          <div>
            <input
              name='title'
              type='text'
              placeholder='Title'
              defaultValue={initialData.title}
              className='w-full border border-gray-300 rounded-lg px-3 py-2'
            />
          </div>

          {/* Content Textarea */}
          <div>
            <textarea
              name='content'
              placeholder="What's on your mind..."
              defaultValue={initialData.content}
              className='w-full border border-gray-300 rounded-lg px-3 py-2'
              rows={4}
            />
          </div>

          {/* Modal Footer */}
          <div className='flex justify-end space-x-4'>
            <Button onClick={handleClose} variant='border-green'>
              Cancel
            </Button>
            <Button type='submit'>{isEditing ? 'Save Changes' : 'Post'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddEditPostModal;
