import { create } from 'zustand';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';

interface EditingCommentState {
  id: string;
  content: string;
  isAnonymous: boolean;
  fileInfo?: FileInfo | null;
}

interface TaskDetailState {
  selectedFile: FileInfo | null;
  currentPin: PinWithAuthor | null;
  pins: PinWithAuthor[];
  isPdfOpen: boolean;
  isEditingPin: boolean;
  isAnonymous: boolean;
  selectedCommentId: string | null;
  editingComment: EditingCommentState | null;

  setSelectedFile: (fileInfo: FileInfo | null) => void;
  setCurrentPin: (pin: PinWithAuthor | null) => void;
  setPins: (pins: PinWithAuthor[]) => void;
  togglePdf: (open: boolean) => void;
  setIsEditingPin: (val: boolean) => void;
  setIsAnonymous: (val: boolean) => void;
  setSelectedCommentId: (id: string | null) => void;
  setEditingComment: (comment: EditingCommentState | null) => void;

  clearCurrentPin: () => void;
  clearFileState: () => void;
  resetAll: () => void;
}

const initialState = {
  selectedFile: null,
  currentPin: null,
  pins: [],
  isPdfOpen: false,
  isEditingPin: false,
  isAnonymous: false,
  selectedCommentId: null,
  editingComment: null,
};

export const useTaskDetailStore = create<TaskDetailState>((set) => ({
  ...initialState,

  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setCurrentPin: (currentPin) => set({ currentPin }),
  setPins: (pins) => set({ pins }),
  togglePdf: (isPdfOpen) => set({ isPdfOpen }),
  setIsEditingPin: (val) => set({ isEditingPin: val }),
  setIsAnonymous: (val) => set({ isAnonymous: val }),
  setSelectedCommentId: (id) => set({ selectedCommentId: id }),
  setEditingComment: (comment) => set({ editingComment: comment }),

  clearCurrentPin: () => set({ currentPin: null }),
  clearFileState: () =>
    set({
      selectedFile: null,
      currentPin: null,
      isPdfOpen: false,
    }),

  resetAll: () => set(initialState),
}));
