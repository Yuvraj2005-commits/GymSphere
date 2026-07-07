"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createMember, updateMember } from "@/actions/member";

import {
  MemberInput,
  MemberSchema,
} from "@/lib/validations/member";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  name: string;
}

interface Member {
  id: string;

  firstName: string;
  lastName: string;

  email: string | null;
  phone: string | null;

  membershipPlanId: string;

  height: number | null;
  weight: number | null;

  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
}

interface Props {
  plans: Plan[];

  member?: Member;

  mode?: "create" | "edit";
}

export default function MemberFormClient({
  plans,
  member,
  mode = "create",
}: Props) {
  const router = useRouter();

  const form = useForm<MemberInput>({
    resolver: zodResolver(MemberSchema),

    defaultValues: {
      firstName: member?.firstName ?? "",

      lastName: member?.lastName ?? "",

      email: member?.email ?? "",

      phone: member?.phone ?? "",

      membershipPlanId:
        member?.membershipPlanId ?? "",

      height: member?.height ?? undefined,

      weight: member?.weight ?? undefined,

      emergencyContactName:
        member?.emergencyContactName ?? "",

      emergencyContactPhone:
        member?.emergencyContactPhone ?? "",
    },
  });

  async function onSubmit(values: MemberInput) {
    let result;

    if (mode === "edit" && member) {
      result = await updateMember(
        member.id,
        values
      );
    } else {
      result = await createMember(values);
    }

    if (result.success) {
      toast.success(result.message);

      router.push("/dashboard/members");

      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 max-w-xl"
    >
      <Input
        placeholder="First Name"
        {...form.register("firstName")}
      />

      <Input
        placeholder="Last Name"
        {...form.register("lastName")}
      />

      <Input
        placeholder="Email"
        {...form.register("email")}
      />

      <Input
        placeholder="Phone"
        {...form.register("phone")}
      />

      <select
        {...form.register("membershipPlanId")}
        className="h-11 w-full rounded-lg border bg-background px-3"
      >
        <option value="">
          Select Membership Plan
        </option>

        {plans.map((plan) => (
          <option
            key={plan.id}
            value={plan.id}
          >
            {plan.name}
          </option>
        ))}
      </select>

      <Input
        type="number"
        placeholder="Height"
        {...form.register("height", {
          valueAsNumber: true,
        })}
      />

      <Input
        type="number"
        placeholder="Weight"
        {...form.register("weight", {
          valueAsNumber: true,
        })}
      />

      <Input
        placeholder="Emergency Contact Name"
        {...form.register(
          "emergencyContactName"
        )}
      />

      <Input
        placeholder="Emergency Contact Phone"
        {...form.register(
          "emergencyContactPhone"
        )}
      />

      <Button
        type="submit"
        className="w-full"
      >
        {mode === "edit"
          ? "Update Member"
          : "Create Member"}
      </Button>
    </form>
  );
}