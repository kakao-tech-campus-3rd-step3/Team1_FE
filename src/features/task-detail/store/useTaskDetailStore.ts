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
  selectedCommentId: string | null;
  setSelectedCommentId: (id: string | null) => void;
  setSelectedFile: (fileInfo: FileInfo | null) => void;
  setPins: (pins: PinWithAuthor[]) => void;
  setCurrentPin: (pin: PinWithAuthor | null) => void;
  togglePdf: (open: boolean) => void;
  isEditingPin: boolean;
  setIsEditingPin: (val: boolean) => void;
  isAnonymous: boolean;
  setIsAnonymous: (val: boolean) => void;
  editingComment: EditingCommentState | null;
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
  isAnonymous: false,
  isEditingPin: false,
  editingComment: null,
  selectedCommentId: null,
};

export const useTaskDetailStore = create<TaskDetailState>((set) => ({
  ...initialState,
  setSelectedCommentId: (id) => set({ selectedCommentId: id }),
  setIsAnonymous: (val) => set({ isAnonymous: val }),
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setPins: (pins) => set({ pins }),
  setCurrentPin: (currentPin) => set({ currentPin }),
  togglePdf: (isPdfOpen) => set({ isPdfOpen }),
  setIsEditingPin: (val) => set({ isEditingPin: val }),
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
