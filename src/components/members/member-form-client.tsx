"use client";

import { useState } from "react";
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

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberInput>({
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
    setLoading(true);

    try {
      const result =
        mode === "edit" && member
          ? await updateMember(member.id, values)
          : await createMember(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/dashboard/members");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-5"
    >
      <div>
        <Input
          placeholder="First Name"
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Last Name"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <Input
        placeholder="Email"
        type="email"
        {...register("email")}
      />

      <Input
        placeholder="Phone"
        {...register("phone")}
      />

      <select
        {...register("membershipPlanId")}
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
        placeholder="Height (cm)"
        {...register("height", {
          valueAsNumber: true,
        })}
      />

      <Input
        type="number"
        placeholder="Weight (kg)"
        {...register("weight", {
          valueAsNumber: true,
        })}
      />

      <Input
        placeholder="Emergency Contact Name"
        {...register(
          "emergencyContactName"
        )}
      />

      <Input
        placeholder="Emergency Contact Phone"
        {...register(
          "emergencyContactPhone"
        )}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? mode === "edit"
            ? "Updating..."
            : "Creating..."
          : mode === "edit"
          ? "Update Member"
          : "Create Member"}
      </Button>
    </form>
  );
}