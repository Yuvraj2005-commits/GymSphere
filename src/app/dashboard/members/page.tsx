import Link from "next/link";

import MemberTable from "@/components/members/member-table";
import MemberSearch from "@/components/members/member-search";

export default function MembersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
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
          className="rounded-xl bg-primary px-5 py-3 text-primary-foreground"
        >
          + Add Member
        </Link>
      </div>

      <MemberSearch />

      <MemberTable />
    </div>
  );
}