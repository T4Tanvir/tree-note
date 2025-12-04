export const FILE_CONTENTS = [
  {
    id: "1-1-1",
    content: `# Button.tsx

This file contains the **Button component**.

## Purpose
Reusable button UI element.

## Example
\`\`\`tsx
<Button variant="primary">Click Me</Button>
\`\`\`
`,
  },
  {
    id: "1-1-2",
    content: `# Card.tsx

This file contains the **Card component**.

## Purpose
Used to wrap content inside a styled card.

## Example
\`\`\`tsx
<Card>Content here</Card>
\`\`\`
`,
  },
  {
    id: "1-1-3",
    content: `# Input.tsx

Input component for text input.

\`\`\`tsx
<Input placeholder="Enter text..." />
\`\`\`
`,
  },
  {
    id: "1-2-1",
    content: `# useAuth.ts

Custom React hook for authentication logic.

## Features
- Login
- Logout
- User validation
`,
  },
  {
    id: "1-2-2",
    content: `# useFetch.ts

Custom hook for fetching data.

## Example
\`\`\`ts
const { data, loading } = useFetch("/api/users");
\`\`\`
`,
  },
  {
    id: "1-3-1",
    content: `# helpers.ts

Utility helper functions used across the project.
`,
  },
  {
    id: "1-3-2",
    content: `# constants.ts

Holds constant values used in the project.
`,
  },
  {
    id: "1-4",
    content: `# App.tsx

Main application component.

\`\`\`tsx
function App() {
  return <h1>Hello World</h1>;
}
export default App;
\`\`\`
`,
  },
  {
    id: "1-5",
    content: `# index.tsx

React application entry point.

\`\`\`tsx
import React from "react";
import App from "./App";
\`\`\`
`,
  },
  {
    id: "2-1",
    content: `# favicon.ico
Binary icon file used for browser tab icon.
`,
  },
  {
    id: "2-2",
    content: `# logo.png
Project logo file.
`,
  },
  {
    id: "3",
    content: `# package.json

Project dependencies and scripts.

\`\`\`json
{
  "name": "project-name",
  "version": "1.0.0"
}
\`\`\`
`,
  },
  {
    id: "4",
    content: `# tsconfig.json

TypeScript compiler configuration file.

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`
`,
  },
];
