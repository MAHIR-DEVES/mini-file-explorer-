'use client';

import { useState } from 'react';
import { useFileSystem } from '@/hooks/useFileSystem';
import Sidebar from '@/components/Sidebar';
import MainPanel from '@/components/MainPanel';
import FileEditor from '@/components/FileEditor';
import { findNode } from '@/utils/fileSystem';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
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
  } = useFileSystem();

  const openFile = openFileId ? findNode(tree, openFileId) : null;
  const contents = getSelectedFolderContents();

  return (
    <div className="flex min-h-screen overflow-hidden bg-white">
      {/* Desktop Sidebar */}
      <Sidebar
        className="hidden md:flex"
        tree={tree}
        selectedFolderId={selectedFolderId}
        openFileId={openFileId}
        onSelectFolder={selectedFolderId => {
          setSelectedFolderId(selectedFolderId);
          setSidebarOpen(false);
        }}
        onOpenFile={fileId => {
          setOpenFileId(fileId);
          setSidebarOpen(false);
        }}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Background overlay - must be first so sidebar is on top */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar panel - comes after to be on top */}
          <div className="absolute left-0 top-0 h-full w-72 bg-gray-50 border-r border-gray-200 shadow-xl">
            <Sidebar
              className="h-full"
              tree={tree}
              selectedFolderId={selectedFolderId}
              openFileId={openFileId}
              onSelectFolder={selectedFolderId => {
                setSelectedFolderId(selectedFolderId);
                // Don't close sidebar when selecting folders - let user expand them
              }}
              onOpenFile={fileId => {
                setOpenFileId(fileId);
                // Close sidebar when opening a file for editing
                setSidebarOpen(false);
              }}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 bg-gray-50 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
          >
            ☰ Menu
          </button>
          <p className="text-sm font-semibold text-gray-700">File Explorer</p>
        </div>

        {/* Breadcrumb */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 truncate">
            {openFile
              ? `Editing: ${openFile.name}`
              : `Folder: ${selectedFolderId}`}
          </p>
        </div>

        {/* File Editor or Main Panel */}
        {openFile ? (
          <FileEditor
            file={openFile}
            onSave={updateContent}
            onClose={() => setOpenFileId(null)}
          />
        ) : (
          <MainPanel
            contents={contents}
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
            onOpenFile={setOpenFileId}
            onCreateNode={createNode}
            onRenameNode={renameNode}
            onDeleteNode={deleteNode}
          />
        )}
      </main>
    </div>
  );
}
