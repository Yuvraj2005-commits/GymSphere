import AuthLayout from "@/components/auth/auth-layout";
import ResetPasswordForm from "@/components/auth/reset-password-form";

interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPasswordPage({
  params,
}: PageProps) {
  const { token } = await params;

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password for your account."
    >
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
}