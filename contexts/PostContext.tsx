'use client';

import { createContext, useContext, useState } from 'react';
import { PostItem } from '@/app/posts/components/PostCard';
import { createPost, getPosts } from '@/api/post/post'; // Your API endpoints
import { AuthContext, AuthContextType } from './AuthContext';
import { PostRequest } from '@/api/post/dtos/post-request.dto';

interface PostsContextProps {
  posts: PostItem[];
  fetchPosts: () => Promise<void>;
  addPost: (newPost: PostRequest) => Promise<void>;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within PostsProvider');
  return context;
};

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const accessToken = authContext?.token ?? '';
  const [posts, setPosts] = useState<PostItem[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const addPost = async (newPost: PostRequest) => {
    try {
      await createPost(accessToken, newPost);
      await fetchPosts();
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  return <PostsContext.Provider value={{ posts, fetchPosts, addPost }}>{children}</PostsContext.Provider>;
};
