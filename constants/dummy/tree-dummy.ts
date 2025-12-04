import { TreeNode } from "@/type/tree";

export const INITIAL_DATA: TreeNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "components",
        type: "folder",
        children: [
          { id: "1-1-1", name: "Button.tsx", type: "file" },
          { id: "1-1-2", name: "Card.tsx", type: "file" },
          { id: "1-1-3", name: "Input.tsx", type: "file" },
        ],
      },
      {
        id: "1-2",
        name: "hooks",
        type: "folder",
        children: [
          { id: "1-2-1", name: "useAuth.ts", type: "file" },
          { id: "1-2-2", name: "useFetch.ts", type: "file" },
        ],
      },
      {
        id: "1-3",
        name: "utils",
        type: "folder",
        children: [
          { id: "1-3-1", name: "helpers.ts", type: "file" },
          { id: "1-3-2", name: "constants.ts", type: "file" },
        ],
      },
      { id: "1-4", name: "App.tsx", type: "file" },
      { id: "1-5", name: "index.tsx", type: "file" },
    ],
  },
  {
    id: "2",
    name: "public",
    type: "folder",
    children: [
      { id: "2-1", name: "favicon.ico", type: "file" },
      { id: "2-2", name: "logo.png", type: "file" },
    ],
  },
  {
    id: "3",
    name: "package.json",
    type: "file",
  },
  {
    id: "4",
    name: "tsconfig.json",
    type: "file",
  },
];
