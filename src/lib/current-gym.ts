import { getCurrentOwner } from "./current-owner";

export async function getCurrentGymId() {
  const owner = await getCurrentOwner();

  if (!owner) {
    return null;
  }

  return owner.gymId;
}