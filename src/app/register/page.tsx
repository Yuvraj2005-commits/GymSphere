import AuthLayout from "@/components/auth/auth-layout";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Create your GymSphere account to get started."
    >
      <RegisterForm />
    </AuthLayout>
  );
}