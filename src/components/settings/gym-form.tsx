import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import GymFormClient from "./gym-form-client";

export default async function GymForm() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const owner = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      owner: {
        include: {
          gym: true,
        },
      },
    },
  });

  if (!owner?.owner) {
    return null;
  }

  const gym = owner.owner.gym;

  return (
    <GymFormClient
      gym={{
        name: gym.name,
        email: gym.email ?? "",
        phone: gym.phone ?? "",
        address: gym.address ?? "",
      }}
    />
  );
}