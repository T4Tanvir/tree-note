"use client";

import { useMemo } from "react";
import type { TreeNode } from "../../type/tree";

/**
 * DFS-based search to filter tree nodes and their parents
 * Ensures parent nodes are visible when children match
 */
function searchTreeDFS(
  nodes: TreeNode[],
  query: string,
  expandedIds: Set<string>,
  matchedIds: Set<string> = new Set(),
  parentIds: Set<string> = new Set()
): { matchedIds: Set<string>; parentIds: Set<string> } {
  const lowerQuery = query.toLowerCase();

  for (const node of nodes) {
    const matches = node.name.toLowerCase().includes(lowerQuery);

    if (matches) {
      matchedIds.add(node.id);
      parentIds.add(node.id);
    }

    if (node.type === "folder" && node.children) {
      const result = searchTreeDFS(
        node.children,
        query,
        expandedIds,
        matchedIds,
        parentIds
      );

      if (result.matchedIds.size > matchedIds.size) {
        // Found matches in children, add this folder to parents
        parentIds.add(node.id);
        result.parentIds.forEach((id) => parentIds.add(id));
      }

      result.matchedIds.forEach((id) => matchedIds.add(id));
    }
  }

  return { matchedIds, parentIds };
}

/**
 * BFS-based traversal to collect all visible nodes based on search
 */
function getVisibleNodesDFS(
  nodes: TreeNode[],
  expandedIds: Set<string>,
  visibleIds: Set<string> = new Set()
): Set<string> {
  for (const node of nodes) {
    visibleIds.add(node.id);

    if (node.type === "folder" && expandedIds.has(node.id) && node.children) {
      getVisibleNodesDFS(node.children, expandedIds, visibleIds);
    }
  }

  return visibleIds;
}

export function useTreeSearch(
  flatNodes: TreeNode[],
  searchQuery: string,
  expandedIds: Set<string>
) {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      const visibleNodeIds = getVisibleNodesDFS(
        flatNodes.filter(
          (n) => !n.name.includes("/") || flatNodes.indexOf(n) === 0
        ),
        expandedIds
      );
      return {
        filteredNodes: flatNodes,
        visibleNodeIds,
      };
    }

    // Find root nodes for search
    const rootNodes: TreeNode[] = [];
    const nodeMap = new Map<string, TreeNode>();

    const buildMap = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        nodeMap.set(node.id, node);
        if (node.type === "folder" && node.children) {
          buildMap(node.children);
        }
      });
    };

    buildMap(flatNodes);

    // Get matching and parent nodes
    const { matchedIds, parentIds } = searchTreeDFS(
      flatNodes,
      searchQuery,
      expandedIds
    );

    // Auto-expand parents when searching
    const newExpandedIds = new Set(expandedIds);
    parentIds.forEach((id) => {
      if (id !== flatNodes.find((n) => matchedIds.has(n.id))?.id) {
        newExpandedIds.add(id);
      }
    });

    // Filter flat nodes to only show matches and their parents
    const filtered = flatNodes.filter((node) => matchedIds.has(node.id));

    return {
      filteredNodes: filtered,
      visibleNodeIds: new Set(filtered.map((n) => n.id)),
    };
  }, [flatNodes, searchQuery, expandedIds]);
}
