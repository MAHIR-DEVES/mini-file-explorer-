import { FileSystemNode } from '@/types/filesystem';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const initialTree: FileSystemNode = {
  id: 'root',
  name: 'Root',
  type: 'folder',
  children: [
    {
      id: 'folder-1',
      name: 'Documents',
      type: 'folder',
      children: [
        {
          id: 'file-1',
          name: 'notes.txt',
          type: 'file',
          content: 'This is my notes file.',
        },
        {
          id: 'file-2',
          name: 'todo.txt',
          type: 'file',
          content: '1. Buy groceries\n2. Clean house',
        },
      ],
    },
    {
      id: 'folder-2',
      name: 'Images',
      type: 'folder',
      children: [
        {
          id: 'folder-3',
          name: 'Vacation',
          type: 'folder',
          children: [],
        },
      ],
    },
    {
      id: 'file-3',
      name: 'readme.txt',
      type: 'file',
      content: 'Welcome to Mini File Explorer!',
    },
  ],
};

// Tree  node id  node  node
export const findNode = (
  tree: FileSystemNode,
  id: string,
): FileSystemNode | null => {
  if (tree.id === id) return tree;
  if (tree.children) {
    for (const child of tree.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
};

// for(let first in second) {third} Node  parent
export const findParent = (
  tree: FileSystemNode,
  id: string,
): FileSystemNode | null => {
  if (tree.children) {
    for (const child of tree.children) {
      if (child.id === id) return tree;
      const found = findParent(child, id);
      if (found) return found;
    }
  }
  return null;
};

// Deep clone
export const deepClone = (node: FileSystemNode): FileSystemNode => {
  return JSON.parse(JSON.stringify(node));
};
