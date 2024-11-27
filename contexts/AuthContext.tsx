'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { signInAPI } from '@/api/auth/auth';

interface AuthState {
  isSignedIn: boolean;
  userName: string | null;
  token: string | null;
}

export interface AuthContextType extends AuthState {
  signIn: (username: string) => Promise<void>;
  signOut: () => void;
}

const initialAuthState: AuthState = {
  isSignedIn: false,
  userName: null,
  token: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const signIn = async (username: string) => {
    try {
      const response = await signInAPI(username);
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
