"use client";

import { useContext } from "react";
import { RegisterContext } from '../context/registerContextProvider';

export const useRegister = () => {
  const registerContext = useContext(RegisterContext);

  if (!registerContext) {
    throw new Error('useRegister must be used within a RegisterContextProvider');
  }

  const {
    user,
    register,
  } = registerContext;

  return {
    user,
    register,
  };
};
