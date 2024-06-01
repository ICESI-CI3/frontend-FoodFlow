"use client";

import { useContext, useEffect, useState, createContext, ReactNode } from "react";
import { auth, db } from "../../../../../services/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, addDoc } from "firebase/firestore";
import { User } from "@/app/interface/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RegisterContextProps {
  user: User | null;
  register: (user: User) => Promise<void>;
}

export const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

interface RegisterContextProviderProps {
  children: ReactNode;
}

export const RegisterContextProvider = ({ children }: RegisterContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const path = '/login'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as unknown as User);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getUsers = () => {
      const q = query(collection(db, "users"));
      const allUsers: User[] = [];
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allUsers.push(doc.data() as User);
        });
        setUsers(allUsers);
      });
    };
    getUsers();
  }, []);

  const register = async (user: User) => {
    try {
      const userExists = users.some((i) => i.email === user.email);

      console.log(user)

      if (!userExists) {
        await addDoc(collection(db, "users"), user);
        const { email, password } = user;
        await createUserWithEmailAndPassword(auth, email, password);
        return <Link href={path}></Link>
      } else {
        alert("El correo ya existe");
      }
    } catch (error) {
      console.error("Error al registrar el usuario: ", error);
      alert("Error al registrar el usuario");
    }
  };

  return (
    <RegisterContext.Provider value={{ user, register }}>
      {children}
    </RegisterContext.Provider>
  );
};
