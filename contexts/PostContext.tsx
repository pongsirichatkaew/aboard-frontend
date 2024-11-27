'use client';

import { createContext, useContext, useState } from 'react';
import { PostItem } from '@/app/posts/components/PostCard';
import { PostRequest } from '@/api/dtos/post-request.dto';
import { useApi } from '@/api/client';
import { useAuth } from './AuthContext';
import { PatchRequest } from '@/api/dtos/patch-request.dto';

interface PostsContextProps {
  posts: PostItem[];
  fetchPosts: () => Promise<void>;
  fetchMyPosts: () => Promise<void>;
  addPost: (newPost: PostRequest) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  editPost: (id: number, updatePost: PatchRequest) => Promise<void>;
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
  const token = authProvider.token ?? '';
  const { get, post, patch, remove } = useApi();

  const fetchPosts = async () => {
    const response = await get('/posts');
    setPosts(response.data);
  };

  const fetchMyPosts = async () => {
    const response = await get('/posts/me', token);
    setPosts(response.data);
  };

  const addPost = async (newPost: PostRequest) => {
    await post(`/posts`, newPost, token);
    await fetchPosts();
  };

  const editPost = async (id: number, updatePost: PatchRequest) => {
    await patch(`/posts/${id}`, updatePost, token);
    await fetchMyPosts();
  };

  const deletePost = async (id: number) => {
    await remove(`/posts/${id}`, token);
    await fetchMyPosts();
  };

  return (
    <PostsContext.Provider value={{ posts, fetchPosts, fetchMyPosts, addPost, editPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
