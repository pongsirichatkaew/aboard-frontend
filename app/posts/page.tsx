'use client';

import { getPosts } from '@/api/post';
import MainNavigation from '@/components/MainNavigation';
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
    <div className='container mx-auto space-y-1 p-8'>
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
