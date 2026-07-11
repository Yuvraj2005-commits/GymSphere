import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentOwner() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      owner: true,
    },
  });

  if (!user?.owner) {
    return null;
  }

  return user.owner;
}