import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const signInAPI = (username: string) => {
  return axios.post(`${apiURL}/users/sign-in`, { username });
};
