import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const members = [
  {
    name: "Rahul Sharma",
    plan: "Premium",
    joined: "Today",
  },
  {
    name: "Priya Singh",
    plan: "Annual",
    joined: "Yesterday",
  },
  {
    name: "Amit Verma",
    plan: "Monthly",
    joined: "2 days ago",
  },
  {
    name: "Sneha Patel",
    plan: "Premium",
    joined: "3 days ago",
  },
];

export default function RecentMembers() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Members</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">
                  {member.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  {member.plan}
                </p>
              </div>
            </div>

            <span className="text-sm text-muted-foreground">
              {member.joined}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}