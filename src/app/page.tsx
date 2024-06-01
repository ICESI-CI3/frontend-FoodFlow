import { RegisterForm } from "../app/pages/register/components/registerForm";
import { RegisterContextProvider } from "../app/pages/register/context/registerContextProvider";
import ProtectedRoute from "../app/pages/register/components/protected-route";

export default function RegisterPage() {
  return (
    <RegisterContextProvider>
      <div className="flex h-screen bg-white p-20">
          <div className="w-2/4 flex justify-center items-center">
            <img src="/Imagotipo.svg" alt="Decorative Image" className="max-w-md" width={600} height={600} />
          </div>
          <div className="w-3/4 flex justify-center items-center">
            <RegisterForm />
          </div>
        </div>  
    </RegisterContextProvider>
  );
}
