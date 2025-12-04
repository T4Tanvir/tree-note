import { TreeNode } from "@/type/tree";

const insertNodeRecursive = (
  nodes: TreeNode[],
  folderId: string,
  newNode: TreeNode
): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === folderId && node.type === "folder") {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }

    if (node.children) {
      return {
        ...node,
        children: insertNodeRecursive(node.children, folderId, newNode),
      };
    }

    return node;
  });
};

const renameNodeRecursive = (
  nodes: TreeNode[],
  nodeId: string,
  updates: Partial<TreeNode>
): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return {
        ...node,
        ...updates,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: renameNodeRecursive(node.children, nodeId, updates),
      };
    }

    return node;
  });
};

const deleteNodeRecursive = (nodes: TreeNode[], nodeId: string): TreeNode[] => {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNodeRecursive(node.children, nodeId),
        };
      }
      return node;
    });
};

export const treeUtils = {
  insertNode: insertNodeRecursive,
  renameNode: renameNodeRecursive,
  deleteNode: deleteNodeRecursive,
};
