export interface FileInfo {
  fileId?: string;
  fileName?: string;
  filePage?: number;
  fileX?: number;
  fileY?: number;
  comments?: Comment[];
  pdfUrl?:string;
}
export type CreateCommentRequest = Omit<
  CommentType,
  'commentId' | 'authorInfo' | 'createdAt' | 'updatedAt'
>;
export interface CommentType {
  commentId: string;
  content: string;
  persona: string;
  isAnonymous: boolean;
  fileInfo: Partial<FileInfo>;
  authorInfo: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}
export type CommentUIType = CommentType & {
  author: string;
  fallback: string;
  timeAgo: string;
  isPinned?: boolean;
};
