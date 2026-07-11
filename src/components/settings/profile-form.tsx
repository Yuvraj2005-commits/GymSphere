import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import ProfileFormClient from "./profile-form-client";

export default async function ProfileForm() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      name: true,
      email: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <ProfileFormClient
      user={{
        name: user.name ?? "",
        email: user.email ?? "",
      }}
    />
  );
}