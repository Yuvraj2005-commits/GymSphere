interface Props {
  membershipEnd: Date | null;
}

export default function MemberExpiryBadge({
  membershipEnd,
}: Props) {
  if (!membershipEnd) {
    return (
      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
        No Expiry
      </span>
    );
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const end = new Date(membershipEnd);

  end.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil(
    (end.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Expired
      </span>
    );
  }

  if (diffDays <= 7) {
    return (
      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
        Expires in {diffDays} day
        {diffDays !== 1 && "s"}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
      {diffDays} days left
    </span>
  );
}