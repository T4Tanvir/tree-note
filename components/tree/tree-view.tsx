"use client";

import { cn } from "@/lib/utils";
import Folder from "./tree-node";
import { TreeNode } from "@/type/tree";

interface TreeViewProps {
  data: TreeNode[];
}

export function TreeView({ data }: TreeViewProps) {
  return (
    <div
      className={cn(
        "focus:outline-none space-y-0 text-sm",
        "bg-sidebar text-sidebar-foreground"
      )}
      role="tree"
      tabIndex={0}
    >
      {data.map((node) => (
        <Folder key={node.id} explorer={node} level={0} />
      ))}
    </div>
  );
}
