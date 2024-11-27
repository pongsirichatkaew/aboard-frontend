import axios from 'axios';
import { PostRequest } from './dtos/post-request.dto';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = () => {
  return axios.get(`${apiURL}/posts`);
};

export const createPost = (accessToken: string, data: PostRequest) => {
  return axios.post(`${apiURL}/posts`, data, { headers: { Authorization: `Bearer ${accessToken}` } });
};
