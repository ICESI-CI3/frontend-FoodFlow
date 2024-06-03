import { RegisterForm } from "./(pages)/register/components/registerForm";

export default function RegisterPage() {
  return (
    <div className="flex h-screen bg-white p-20 pl-40">
      <div className="w-2/4 flex justify-center items-center">
        <img src="/Isotipo.svg" alt="Decorative Image" className="max-w-md" width={1000} height={1000} />
      </div>
      <div className="w-3/4 flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>  
  );
}
