"use client";

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/app/auth/hooks/useAuth';
import { useRouter } from "next/navigation";
import { User } from '@/app/interface/user';

interface ProtectedRouteProps {
  children: ReactNode;
  role: string;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps, role: string) => {
  const { user, users } = useAuth();
  const router = useRouter();

  if(!user){
    router.push("/")
  }

  const userEmail: User = users.find((i: any) => i.email === user.email) as User;

  if (userEmail) {
    if (userEmail.role != role) {
      router.push("/")
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
