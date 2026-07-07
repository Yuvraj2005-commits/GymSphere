import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        Welcome to GymSphere 🚀
      </h1>

      <div className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Logged in successfully
        </h2>

        <p className="mt-4">
          <strong>Name:</strong> {session.user?.name}
        </p>

        <p>
          <strong>Email:</strong> {session.user?.email}
        </p>
      </div>
    </main>
  );
}