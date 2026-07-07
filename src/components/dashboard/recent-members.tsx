const members = [
  {
    name: "Rahul Sharma",
    plan: "Premium",
  },
  {
    name: "Aman Kumar",
    plan: "Gold",
  },
  {
    name: "Priya Singh",
    plan: "Monthly",
  },
];

export default function RecentMembers() {
  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Recent Members
      </h2>

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <p className="font-semibold">
                {member.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {member.plan}
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}