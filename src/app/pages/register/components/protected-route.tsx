"use client";

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from '../hooks/useContextRegister';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useRegister();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
