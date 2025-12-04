// components/SidebarHeader.tsx
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

interface SidebarHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SidebarHeader({
  searchQuery,
  onSearchChange,
}: SidebarHeaderProps) {
  return (
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-sidebar-foreground">
          Explorer
        </h2>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-8 text-xs bg-input border-border placeholder:text-muted-foreground"
      />
    </div>
  );
}
