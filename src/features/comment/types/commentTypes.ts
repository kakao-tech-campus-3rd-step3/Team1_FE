export interface FileInfo {
  fileId?: string;
  fileName?: string;
  filePage?: number;
  fileX?: number;
  fileY?: number;
  comments?: Comment[];
  fileUrl?: string;
}
export interface AuthorInfo {
  id: string;
  name: string;
  avatar: string;
  backgroundColor: string;
}

export interface CommentType {
  commentId: string;
  content: string;
  persona: string;
  isAnonymous: boolean;
  fileInfo?: FileInfo;
  authorInfo: AuthorInfo;
  createdAt: string;
  updatedAt: string;
}
export interface CommentUIType extends CommentType {
  author: string;
  fallback: string;
  timeAgo: string;
  isPinned?: boolean;
}

export interface PinWithAuthor {
  fileId: string;
  fileName?: string;
  filePage?: number;
  fileX?: number;
  fileY?: number;
  author?: AuthorInfo;
}
