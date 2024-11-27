'use client';

import { getPosts } from '@/api/post';
import Post from '@/components/Post';
import axios from 'axios';
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
    <div className='p-8 bg-gray-100 min-h-screen'>
      <div className='container mx-auto space-y-1'>
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.user.username}
            community={post.community}
            title={post.title}
            content={post.content}
            commentCount={post.comments.length}
            avatarUrl={post.user.avatarUrl}
          />
        ))}
      </div>
    </div>
  );
}
