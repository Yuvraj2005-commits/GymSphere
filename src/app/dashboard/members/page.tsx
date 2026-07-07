import MemberTable from "@/components/members/member-table";
import SearchBar from "@/components/members/search-bar";

export default function MembersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Members</h1>
          <p className="text-muted-foreground">
            Manage all gym members from one place.
          </p>
        </div>

        <button className="rounded-xl bg-primary px-5 py-3 text-primary-foreground transition hover:opacity-90">
          + Add Member
        </button>
      </div>

      <SearchBar />

      <MemberTable />
    </div>
  );
}