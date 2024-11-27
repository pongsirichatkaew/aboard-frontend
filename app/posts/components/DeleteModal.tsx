'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import React, { useState } from 'react';
import Image from 'next/image';
import { usePosts } from '@/contexts/PostContext';

interface DeleteConfirmationModalProps {
  postId: number;
}

const DeletePostModal: React.FC<DeleteConfirmationModalProps> = ({ postId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { deletePost } = usePosts();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleDelete = async () => {
    await deletePost(postId);
    handleClose();
  };

  return (
    <div>
      {/* Image Button */}
      <Image
        className='cursor-pointer'
        src='./icons/bin.svg'
        onClick={handleOpen}
        alt='Delete Menu'
        width={24}
        height={24}
      />

      {/* Modal Section */}
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <h2 className='text-xl font-semibold mb-4'>Please confirm if you wish to delete the post</h2>
        <p className='text-gray-700 mb-6'>
          Are you sure you want to delete the post? Once deleted, it cannot be recovered.
        </p>
        <div className='flex justify-center space-x-4'>
          <Button onClick={handleClose} variant='border-grey'>
            Close
          </Button>
          <Button onClick={handleDelete} variant='danger'>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeletePostModal;
