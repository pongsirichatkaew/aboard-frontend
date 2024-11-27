'use client';

import { createContext, useContext, useState } from 'react';
import { PostItem } from '@/app/posts/components/PostCard';
import { PostRequest } from '@/api/dtos/post-request.dto';
import { useApi } from '@/api/client';
import { useAuth } from './AuthContext';

interface PostsContextProps {
  posts: PostItem[];
  fetchPosts: () => Promise<void>;
  fetchMyPosts: () => Promise<void>;
  addPost: (newPost: PostRequest) => Promise<void>;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within PostsProvider');
  return context;
};

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const authProvider = useAuth();
  const { get, post } = useApi();

  const fetchPosts = async () => {
    const response = await get('/posts');
    setPosts(response.data);
  };

  const fetchMyPosts = async () => {
    const response = await get('/posts/me');
    setPosts(response.data);
  };

  const addPost = async (newPost: PostRequest) => {
    await post(`/posts`, newPost, authProvider.token ?? '');
    await fetchPosts();
  };

  return <PostsContext.Provider value={{ posts, fetchPosts, fetchMyPosts, addPost }}>{children}</PostsContext.Provider>;
};
