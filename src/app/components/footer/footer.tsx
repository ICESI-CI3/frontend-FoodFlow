import { FC, InputHTMLAttributes } from "react";

interface FooterProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ id, placeholder, type, className, ...props }) => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 absolute px-6 py-4 w-full text-center text-sm text-gray-500 dark:absolute w-full text-gray-400">
        &copy; 2023 FoodFlow. Todos los derechos reservados.
    </footer>
  );
};