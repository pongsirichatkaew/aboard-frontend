'use client';

import Post, { PostItem } from '@/app/posts/components/PostCard';
import { usePosts } from '@/contexts/PostContext';
import { useEffect } from 'react';
import AddPostModal from './components/AddEditPostModal';

export default function PostsPage() {
  const { posts, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='flex flex-col space-y-1 p-8'>
      <div className='flex flex-row-reverse py-4 items-end gap-4'>
        <AddPostModal />
      </div>

      {posts.map((post: PostItem) => (
        <Post
          key={post.id}
          postId={post.id}
          username={post.user.username}
          community={post.community}
          title={post.title}
          content={post.content}
          commentCount={post.comments.length}
        />
      ))}
    </div>
  );
}
