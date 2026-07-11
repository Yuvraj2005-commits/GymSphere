"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { checkOut } from "@/actions/attendance";

interface CheckOutButtonProps {
  attendanceId: string;
}

export default function CheckOutButton({
  attendanceId,
}: CheckOutButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleCheckOut() {
    startTransition(async () => {
      const result = await checkOut(attendanceId);

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
      variant="destructive"
      disabled={isPending}
      onClick={handleCheckOut}
    >
      {isPending ? "Checking..." : "Check Out"}
    </Button>
  );
}