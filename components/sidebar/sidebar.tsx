"use client";
import { INITIAL_DATA } from "@/constants/dummy/tree-dummy";
import useTree from "@/hooks/use-tree";
import { useEffect, useState } from "react";
import { TreeView } from "../tree";
import { SidebarHeader } from "./sidebar.header";
import { ResizeHandle } from "./sidebar.resizeHandle";

const Sidebar = () => {
  const { setTreeNodes, treeNodes } = useTree();

  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(320);

  useEffect(() => {
    setTreeNodes(INITIAL_DATA);
  }, [setTreeNodes]);

  return (
    <div
      className="border-r border-border flex flex-col bg-sidebar relative"
      style={{ width: `${sidebarWidth}px` }}
    >
      <SidebarHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 overflow-auto">
        <TreeView data={treeNodes} />
      </div>

      <ResizeHandle
        onSidebarWidth={setSidebarWidth}
        sidebarWidth={sidebarWidth}
      />
    </div>
  );
};

export default Sidebar;
