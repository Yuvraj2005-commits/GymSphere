import VerifyEmailForm from "@/components/auth/verify-email-form";

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { email = "" } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <VerifyEmailForm email={email} />
    </div>
  );
}