"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Search members..."
        className="pl-10"
      />
    </div>
  );
}