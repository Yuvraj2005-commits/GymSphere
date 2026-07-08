"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentSearch() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(
    params.get("search") || ""
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        router.push(
          `/dashboard/payments?search=${encodeURIComponent(
            search
          )}`
        );
      }}
      className="mb-6"
    >
      <input
        className="w-full rounded-lg border px-4 py-3"
        placeholder="Search member..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </form>
  );
}