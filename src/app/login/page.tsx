import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen shipcat-grid flex flex-col items-center justify-center p-4 sm:p-6 font-sans selection:bg-[#3F86F7] selection:text-white">
      <main className="w-full max-w-md my-auto">
        <AuthForm />
      </main>
    </div>
  );
}
