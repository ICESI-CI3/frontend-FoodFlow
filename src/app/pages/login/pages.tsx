import { Input } from "../../components/input/input"
import { Label } from "../../components/label/label"
import { Button } from "../../components/button/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="hidden md:block">
        <img
          src="/placeholder.svg"
          alt="Login Image"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center mb-6">
            <MailIcon className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" />
            <h2 className="text-2xl font-bold">Login to your account</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" className="mt-1" />
            </div>
            <Button className="w-full bg-[#F7511E] text-white hover:bg-[#d44614] focus:ring-2 focus:ring-[#F7511E] focus:ring-opacity-50">
              Login
            </Button>
            <div className="text-center text-gray-500 dark:text-gray-400">
              If you already have an account,{" "}
              <Link href="/register" className="underline" prefetch={false}>
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}