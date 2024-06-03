"use client";

import { useContext } from "react";
import { AuthContext } from "../context/contextProvider";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useLogin must be used within a LoginContextProvider");
  }

  const { user, login, logout, register, users } = authContext;

  return {
    user,
    login,
    logout,
    register,
    users,
  };
};
