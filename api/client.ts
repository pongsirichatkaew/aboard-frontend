// utils/api.ts
import { useAuth } from '@/contexts/AuthContext';
import { useError } from '@/contexts/ErrorContext';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Example of using the error context in API calls
export const useApi = () => {
  const { setError } = useError();
  const get = async (url: string) => {
    try {
      const response = await api.get(url);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
      setError(errorMessage);
    }
  };

  const post = async (url: string, data: any, token?: string) => {
    try {
      const response = await api.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
      setError(errorMessage);
    }
  };

  return { get, post };
};
