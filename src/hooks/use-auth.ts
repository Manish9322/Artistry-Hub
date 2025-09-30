
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadAuthData = useCallback(() => {
    setIsLoading(true);
    try {
      const storedToken = localStorage.getItem('jwt');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to load auth data from storage", error);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAuthData();
     // Listen for storage changes to sync across tabs
    window.addEventListener('storage', (event) => {
        if (event.key === 'jwt' || event.key === 'user') {
            loadAuthData();
        }
    });
    return () => {
      window.removeEventListener('storage', loadAuthData);
    };
  }, [loadAuthData]);

  const login = useCallback((userData: User, jwtToken: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('jwt', jwtToken);
    setUser(userData);
    setToken(jwtToken);
    // Manually dispatch a storage event to sync tabs
    window.dispatchEvent(new StorageEvent('storage', { key: 'jwt' }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    localStorage.removeItem('pendingBooking');
    setUser(null);
    setToken(null);
    // Manually dispatch a storage event to sync tabs
    window.dispatchEvent(new StorageEvent('storage', { key: 'jwt' }));
    router.push('/login');
  }, [router]);

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };
}
