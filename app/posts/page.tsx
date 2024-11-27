'use client';

import { getPosts } from '@/api/post';
import Post, { PostItem } from '@/components/Post';
import { useEffect, useState } from 'react';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(); // Replace with your API endpoint
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className='flex flex-col space-y-1 p-8'>
      <div className='flex flex-row-reverse py-4 items-end gap-4'>
        <button className='bg-success text-white px-4 py-2 rounded-lg hover:bg-green-400' onClick={() => {}}>
          Create +
        </button>
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
