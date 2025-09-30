
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        router.replace('/admin/login');
        return;
      }

      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        if (decodedToken.role !== 'admin' || decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('user');
          router.replace('/admin/login');
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        router.replace('/admin/login');
      }
    }, [router]);

    if (!isAuthorized) {
      return (
        <div className="flex items-center justify-center h-screen">
            <p>Loading...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAdminAuth;
