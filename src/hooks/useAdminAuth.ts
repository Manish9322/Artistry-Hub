
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
};

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadAuthData = useCallback(() => {
    setIsLoading(true);
    try {
      const storedToken = localStorage.getItem('admin_jwt');
      const storedUser = localStorage.getItem('admin_user');
      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === 'admin') {
            setToken(storedToken);
            setUser(parsedUser);
        } else {
             // Clear invalid data from admin storage
            localStorage.removeItem('admin_user');
            localStorage.removeItem('admin_jwt');
            setToken(null);
            setUser(null);
        }
      } else {
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to load admin auth data from storage", error);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAuthData();
    window.addEventListener('storage', (event) => {
        if (event.key === 'admin_jwt' || event.key === 'admin_user') {
            loadAuthData();
        }
    });
    return () => {
      window.removeEventListener('storage', loadAuthData);
    };
  }, [loadAuthData]);

  const login = useCallback((userData: User, jwtToken: string) => {
    localStorage.setItem('admin_user', JSON.stringify(userData));
    localStorage.setItem('admin_jwt', jwtToken);
    setUser(userData);
    setToken(jwtToken);
    // Manually dispatch a storage event to sync tabs
    window.dispatchEvent(new StorageEvent('storage', { key: 'admin_jwt' }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_jwt');
    setUser(null);
    setToken(null);
     // Manually dispatch a storage event to sync tabs
    window.dispatchEvent(new StorageEvent('storage', { key: 'admin_jwt' }));
    router.push('/admin/login');
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
