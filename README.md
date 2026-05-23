# Mini File Explorer

A simple file manager built with Next.js where you can create, rename, delete,
and manage folders and files — kind of like a lightweight version of Windows
Explorer but in the browser.

---

## Why I built it this way

I wanted to keep things straightforward. The whole file system lives in React
state and gets saved to localStorage, so nothing is lost on refresh. I used a
recursive component for the sidebar tree because that's honestly the cleanest
way to handle nested folders — you don't know how deep the nesting goes, so
recursion just makes sense.

---

## What you can do

- Create folders and text files inside any folder
- Rename anything by hovering over it
- Delete files or folders (deleting a folder removes everything inside it)
- Click a folder to see its contents in the main panel
- Double-click a text file to open and edit it
- Changes save automatically to localStorage

---

## Tech stack

- **Next.js 16** — App Router
- **TypeScript** — for type safety across the whole codebase
- **Tailwind CSS** — utility-first styling, no separate CSS files needed
- **lucide-react** — for the icons (folder, file, chevrons etc.)

No backend. No database. Just the frontend.

---

## Project structure

```
mini-file-explorer/
├── app/
│   ├── page.tsx           # Entry point, wires everything together
│   └── globals.css
├── components/
│   ├── Sidebar.tsx        # Left panel with the tree view
│   ├── TreeNode.tsx       # Recursive component for each folder/file in the tree
│   ├── MainPanel.tsx      # Right panel showing contents of selected folder
│   └── FileEditor.tsx     # Opens when you click a text file
├── hooks/
│   └── useFileSystem.ts   # All the state logic lives here
├── types/
│   └── filesystem.ts      # TypeScript types
└── utils/
    └── fileSystem.ts      # Helper functions + initial mock data
```

---

## Getting started

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## How the data is structured

Each node in the tree is either a folder or a file:

```typescript
interface FileSystemNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FileSystemNode[]; // only folders have this
  content?: string; // only files have this
}
```

The whole tree starts from a single root node and branches out from there. All
operations (create, rename, delete, update content) go through the
`useFileSystem` hook, which handles cloning the tree, making the change, and
updating state.

---

## A few decisions I made

**localStorage over a backend** — The task didn't require persistence across
devices or users, so localStorage is more than enough here. It also keeps the
setup simple — no API routes, no database config.

**Recursive TreeNode component** — I could have flattened the data and rendered
it differently, but a recursive component mirrors the actual tree structure of
the data, which makes it easier to reason about.

**useFileSystem hook** — Keeping all the state logic in one place made it easy
to test each operation in isolation and keep the components clean.

---

## Responsive design

The layout adjusts for smaller screens. On mobile, the sidebar collapses and the
main panel takes full width.

---

Built for Webbly Media — May 2026
