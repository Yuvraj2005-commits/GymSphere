"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  MemberInput,
  MemberSchema,
} from "@/lib/validations/member";

import { createMember } from "@/actions/member";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function MemberForm() {
  const form = useForm<MemberInput>({
    resolver: zodResolver(MemberSchema),
  });

  async function onSubmit(values: MemberInput) {
    await createMember(values);

    form.reset();
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

      <Input
        placeholder="Membership Plan ID"
        {...form.register("membershipPlanId")}
      />

      <Button type="submit">
        Save Member
      </Button>
    </form>
  );
}