import { useState, useEffect } from 'react';
import { FileSystemNode } from '@/types/filesystem';
import {
  initialTree,
  generateId,
  findNode,
  findParent,
  deepClone,
} from '@/utils/fileSystem';

export const useFileSystem = () => {
  const [tree, setTree] = useState<FileSystemNode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fileExplorerTree');
      return saved ? JSON.parse(saved) : initialTree;
    }
    return initialTree;
  });

  const [selectedFolderId, setSelectedFolderId] = useState<string>('root');
  const [openFileId, setOpenFileId] = useState<string | null>(null);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem('fileExplorerTree', JSON.stringify(tree));
  }, [tree]);

  // create new folder or file
  const createNode = (
    parentId: string,
    type: 'folder' | 'file',
    name: string,
  ) => {
    const newNode: FileSystemNode = {
      id: generateId(),
      name,
      type,
      ...(type === 'folder' ? { children: [] } : { content: '' }),
    };

    setTree(prev => {
      const cloned = deepClone(prev);
      const parent = findNode(cloned, parentId);
      if (parent && parent.children) {
        parent.children.push(newNode);
      }
      return cloned;
    });
  };

  // rename folder or file
  const renameNode = (id: string, newName: string) => {
    setTree(prev => {
      const cloned = deepClone(prev);
      const node = findNode(cloned, id);
      if (node) node.name = newName;
      return cloned;
    });
  };

  // Delete node
  const deleteNode = (id: string) => {
    setTree(prev => {
      const cloned = deepClone(prev);
      const parent = findParent(cloned, id);
      if (parent && parent.children) {
        parent.children = parent.children.filter(child => child.id !== id);
      }
      return cloned;
    });

    if (openFileId === id) setOpenFileId(null);
    if (selectedFolderId === id) setSelectedFolderId('root');
  };

  // File  content update
  const updateContent = (id: string, content: string) => {
    setTree(prev => {
      const cloned = deepClone(prev);
      const node = findNode(cloned, id);
      if (node && node.type === 'file') node.content = content;
      return cloned;
    });
  };

  // Selected folder children
  const getSelectedFolderContents = (): FileSystemNode[] => {
    const folder = findNode(tree, selectedFolderId);
    return folder?.children || [];
  };

  return {
    tree,
    selectedFolderId,
    openFileId,
    setSelectedFolderId,
    setOpenFileId,
    createNode,
    renameNode,
    deleteNode,
    updateContent,
    getSelectedFolderContents,
    findNode,
  };
};
