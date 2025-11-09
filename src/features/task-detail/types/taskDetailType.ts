import type { PersonaType } from '@/features/comment/constants/personaConstants';
import type { AuthorInfo } from '@/features/comment/types/commentTypes';

export interface FileInfo {
  fileId?: string;
  fileName?: string;
  filePage?: number;
  fileX?: number;
  fileY?: number;
  fileUrl?: string;
}

export interface PinWithAuthor {
  fileId: string;
  fileName?: string;
  filePage?: number;
  fileX?: number;
  fileY?: number;
  author?: AuthorInfo;
  commentId?: string;
  isAnonymous?: boolean;
  persona: PersonaType;
}
export type FileStatus = 'uploading' | 'success';
