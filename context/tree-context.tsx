"use client";
import { TreeNode } from "@/type/tree";
import React, { ReactNode, useState } from "react";

interface TreeContextType {
  treeNodes: TreeNode[];
  setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>;
  selectedNode: TreeNode | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<TreeNode | null>>;
}

export const TreeContext = React.createContext<TreeContextType | undefined>(
  undefined
);

interface TreeProviderProps {
  children: ReactNode;
}

export const TreeProvider = ({ children }: TreeProviderProps) => {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  return (
    <TreeContext.Provider
      value={{ treeNodes, setTreeNodes, selectedNode, setSelectedNode }}
    >
      {children}
    </TreeContext.Provider>
  );
};
