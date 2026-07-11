"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import MemberStatusBadge from "./member-status-badge";
import MemberExpiryBadge from "./member-expiry-badge";
import DeleteMemberDialog from "./delete-member-dialog";

interface MemberRowProps {
  member: {
    id: string;
    firstName: string;
    lastName: string;

    email: string | null;
    phone: string | null;

    status: string;

    joinedAt: Date;

    membershipStart: Date | null;
    membershipEnd: Date | null;

    membershipPlan: {
      id: string;
      name: string;
    };
  };
}

export default function MemberRow({
  member,
}: MemberRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/30">
      {/* Member */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            {member.firstName.charAt(0)}
          </div>

          <div>
            <p className="font-semibold">
              {member.firstName} {member.lastName}
            </p>

            <p className="text-sm text-muted-foreground">
              {member.email ?? "No email"}
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-5">
        {member.email ?? "-"}
      </td>

      {/* Phone */}
      <td className="px-6 py-5">
        {member.phone ?? "-"}
      </td>

      {/* Membership Plan */}
      <td className="px-6 py-5">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {member.membershipPlan.name}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <MemberStatusBadge
          status={member.status}
        />
      </td>

      {/* Joined */}
      <td className="px-6 py-5">
        {member.joinedAt.toLocaleDateString()}
      </td>

      {/* Expiry */}
      <td className="px-6 py-5">
        <MemberExpiryBadge
          membershipEnd={member.membershipEnd}
        />
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center justify-center gap-4">
          <Link
            href={`/dashboard/members/${member.id}`}
            className="transition hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Link>

          <DeleteMemberDialog
            memberId={member.id}
          />
        </div>
      </td>
    </tr>
  );
}