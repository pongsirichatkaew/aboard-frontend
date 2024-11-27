'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { signInAPI } from '@/api/auth/auth';
import { useApi } from '@/api/client';

interface AuthState {
  isSignedIn: boolean;
  userId: number | null;
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
  userId: null,
  token: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const { post } = useApi();

  const signIn = async (username: string) => {
    const response = await post(`/users/sign-in`, { username });
    const { accessToken, user } = response.data;

    setAuthState({
      isSignedIn: true,
      userId: user.id,
      userName: user.username,
      token: accessToken,
    });
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
