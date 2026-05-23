'use client';

import { FileSystemNode } from '@/types/filesystem';
import TreeNode from './TreeNode';
import { X } from 'lucide-react';

interface SidebarProps {
  tree: FileSystemNode;
  selectedFolderId: string;
  openFileId: string | null;
  onSelectFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
  onClose?: () => void;
  className?: string;
}

const Sidebar = ({
  tree,
  selectedFolderId,
  openFileId,
  onSelectFolder,
  onOpenFile,
  onClose,
  className = '',
}: SidebarProps) => {
  return (
    <aside
      className={`w-64 min-h-screen bg-gray-50 border-r border-gray-200 flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          File Explorer
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <TreeNode
          node={tree}
          selectedFolderId={selectedFolderId}
          openFileId={openFileId}
          onSelectFolder={onSelectFolder}
          onOpenFile={onOpenFile}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
