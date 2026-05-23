export type NodeType = 'folder' | 'file';

export interface FileSystemNode {
  id: string;
  name: string;
  type: NodeType;
  children?: FileSystemNode[];
  content?: string;
}

export interface FileSystemState {
  tree: FileSystemNode;
  selectedFolderId: string;
  openFileId: string | null;
}
