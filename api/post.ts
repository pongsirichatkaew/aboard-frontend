import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = () => {
  return axios.get(`${apiURL}/posts`);
};
