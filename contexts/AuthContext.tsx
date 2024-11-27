'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthState {
  isSignedIn: boolean;
  userName: string | null;
  token: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (username: string) => Promise<void>;
  signOut: () => void;
}

const initialAuthState: AuthState = {
  isSignedIn: false,
  userName: null,
  token: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const signIn = async (username: string) => {
    try {
      const response = await axios.post(`${apiURL}/users/sign-in`, { username });
      const { accessToken, user } = response.data;

      setAuthState({
        isSignedIn: true,
        userName: user.username,
        token: accessToken,
      });
    } catch (error) {
      console.error('Sign-In Failed:', error);
      throw new Error('Failed to sign in. Please try again.');
    }
  };

  const signOut = () => {
    setAuthState(initialAuthState);
  };

  return <AuthContext.Provider value={{ ...authState, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
