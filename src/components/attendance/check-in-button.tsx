"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { checkIn } from "@/actions/attendance";
import { Button } from "@/components/ui/button";

interface CheckInButtonProps {
  memberId: string;
}

export default function CheckInButton({
  memberId,
}: CheckInButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleCheckIn() {
    startTransition(async () => {
      const result = await checkIn(memberId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      size="sm"
      disabled={isPending}
      onClick={handleCheckIn}
    >
      {isPending ? "Checking..." : "Check In"}
    </Button>
  );
}