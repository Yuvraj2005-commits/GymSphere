"use client";

import { useTransition } from "react";
import { checkIn } from "@/actions/attendance";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  memberId: string;
}

export default function CheckInButton({
  memberId,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await checkIn(memberId);

          if (result.success) {
            toast.success("Checked in successfully");
          } else {
            toast.error(result.message);
          }
        })
      }
    >
      {pending ? "..." : "Check In"}
    </Button>
  );
}