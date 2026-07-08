"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { checkOut } from "@/actions/attendance";

interface Props {
  attendanceId: string;
}

export default function CheckOutButton({
  attendanceId,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="destructive"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await checkOut(attendanceId);

          toast.success("Checked out successfully");
        })
      }
    >
      {pending ? "..." : "Check Out"}
    </Button>
  );
}