import Link from "next/link";

import MemberSearch from "@/components/members/member-search";
import MemberTable from "@/components/members/member-table";

export default function MembersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Members
          </h1>

          <p className="text-muted-foreground">
            Manage all gym members.
          </p>
        </div>

        <Link
          href="/dashboard/members/new"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          + Add Member
        </Link>
      </div>

      <MemberSearch />

      <MemberTable />
    </div>
  );
}