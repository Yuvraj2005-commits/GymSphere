import { Pencil, Trash2 } from "lucide-react";

interface MemberProps {
  member: {
    name: string;
    email: string;
    phone: string;
    plan: string;
    status: string;
  };
}

export default function MemberCard({
  member,
}: MemberProps) {
  return (
    <tr className="border-t">
      <td className="px-6 py-4 font-medium">
        {member.name}
      </td>

      <td className="px-6 py-4">
        {member.email}
      </td>

      <td className="px-6 py-4">
        {member.phone}
      </td>

      <td className="px-6 py-4">
        {member.plan}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            member.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {member.status}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-3">
          <button>
            <Pencil className="h-4 w-4" />
          </button>

          <button>
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}