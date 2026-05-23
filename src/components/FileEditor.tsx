'use client';

import { useState, useEffect } from 'react';
import { FileSystemNode } from '@/types/filesystem';
import { X, Save, FileText } from 'lucide-react';

interface FileEditorProps {
  file: FileSystemNode;
  onSave: (id: string, content: string) => void;
  onClose: () => void;
}

const FileEditor = ({ file, onSave, onClose }: FileEditorProps) => {
  const [content, setContent] = useState(file.content || '');
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setContent(file.content || '');
    setSaved(true);
  }, [file.id]);

  const handleChange = (value: string) => {
    setContent(value);
    setSaved(false);
  };

  const handleSave = () => {
    onSave(file.id, content);
    setSaved(true);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-blue-400" />
          <span className="text-sm font-medium text-gray-700">{file.name}</span>
          {!saved && (
            <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded">
              Unsaved
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            <Save size={12} /> Save
          </button>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={e => handleChange(e.target.value)}
        placeholder="Start typing..."
        className="flex-1 min-h-0 p-4 text-sm font-mono text-gray-800 resize-none outline-none overflow-auto"
      />

      {/* Footer */}
      <div className="px-4 py-1 border-t border-gray-100 bg-gray-50">
        <span className="text-xs text-gray-400">
          {content.length} characters · {content.split('\n').length} lines
        </span>
      </div>
    </div>
  );
};

export default FileEditor;
