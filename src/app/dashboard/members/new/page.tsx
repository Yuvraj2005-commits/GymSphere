import MemberForm from "@/components/members/member-form";

export default function NewMemberPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Add Member
        </h1>

        <p className="text-muted-foreground">
          Create a new gym member.
        </p>
      </div>

      <MemberForm />
    </div>
  );
}