import { TreeContext } from "@/context/tree-context";
import { treeUtils } from "@/lib/tree";
import { generateId } from "@/lib/utils";
import { TreeNode } from "@/type/tree";
import { useContext } from "react";

const useTree = () => {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }

  const { setTreeNodes: setTreeData } = context;

  const insertNode = (folderId: string, name: string, isFolder: boolean) => {
    const newNode: TreeNode = {
      id: generateId(isFolder ? "folder" : "file"),
      name,
      type: isFolder ? "folder" : "file",
    };

    setTreeData((prev) => treeUtils.insertNode(prev, folderId, newNode));
  };

  const deleteNode = (nodeId: string) => {
    setTreeData((prev) => treeUtils.deleteNode(prev, nodeId));
  };

  const renameNode = (nodeId: string, newName: string) => {
    setTreeData((prev) =>
      treeUtils.renameNode(prev, nodeId, { name: newName })
    );
  };

  return { insertNode, deleteNode, renameNode, ...context };
};

export default useTree;
