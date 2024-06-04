"use client";

import { useContext, useEffect, useState, createContext, ReactNode } from "react";
import { auth, db } from "../../../../services/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, getAdditionalUserInfo } from "firebase/auth";
import { collection, onSnapshot, query, deleteDoc, addDoc } from "firebase/firestore";
import { User } from "@/app/interface/user";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface AuthContextProps {
  user: any | null;
  register: (user: User) => Promise<void>;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  users: User[] | []
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { email } = currentUser
        setUser(email)
      } else {
        setUser(null)
      }
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

      if (!userExists) {
        await addDoc(collection(db, "users"), user);
        const { email, password } = user;
        await createUserWithEmailAndPassword(auth, email, password);
        Swal.fire({
          title: "Éxito",
          text: "Cuenta creada correctamente",
          icon: "success",
          timer: 3000,
        })
        router.push("/login")
      } else {
        Swal.fire({
          title: "Error",
          text: "El correo ingresado ya existe",
          icon: "error",
          timer: 3000,
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se ha podido registrar el usuario",
        icon: "error",
        timer: 3000,
      })
    }
  };

  const login = async (user: any) => {
    try {
      const userExists = users.some((i) => i.email != user.email);

      if (userExists) {
        const { email, password } = user;
        const credentials = await signInWithEmailAndPassword(auth, email, password);

        if (credentials) {
          const userEmail: User | undefined = users.find((i: any) => i.email === email);

          Swal.fire({
            title: "Éxito",
            text: "Inicio de sesión realizado con éxito",
            icon: "success",
            timer: 3000,
          })

          if (userEmail?.role == "administrador") {
            router.push("/admin/order")
          } else if (userEmail?.role == "mesero") {
            router.push("/waiter/menu")
          } else if (userEmail?.role == "chef") {
            router.push("/chefOrder")
          }
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "El correo ingresado no existe",
          icon: "error",
          timer: 3000,
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo iniciar sesión",
        icon: "error",
        timer: 3000,
      })
    }
  };

  const logout = async () => {
    try {
      router.push("/login")
      await signOut(auth)
      Swal.fire({
        title: "Éxito",
        text: "Sesión cerrada correctamente",
        icon: "success",
        timer: 3000,
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error",
        text: "No se pudo cerrar la sesión",
        icon: "error",
        timer: 3000,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, users }}>
      {children}
    </AuthContext.Provider>
  );
};
