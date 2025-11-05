import { create } from 'zustand';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';

interface EditingCommentState {
  id: string;
  content: string;
  isAnonymous: boolean;
  fileInfo?: FileInfo | null;
}

interface TaskDetailState {
  // ===== 📄 PDF / 파일 관련 =====
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

  // ===== 🧷 핀 편집 상태 =====
  isEditingPin: boolean;
  setIsEditingPin: (val: boolean) => void;

  // ===== 🙈 익명 상태 =====
  isAnonymous: boolean;
  setIsAnonymous: (val: boolean) => void;

  // ===== 💬 댓글 편집 상태 =====
  editingComment: EditingCommentState | null;
  setEditingComment: (comment: EditingCommentState | null) => void;

  // ===== ♻️ 초기화 유틸 =====
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
};

export const useTaskDetailStore = create<TaskDetailState>((set) => ({
  ...initialState,
  // ===== 핀 선택 -> 댓글 =====

  selectedCommentId: null,
  setSelectedCommentId: (id) => set({ selectedCommentId: id }),

  // ===== 🙈 익명 =====
  setIsAnonymous: (val) => set({ isAnonymous: val }),

  // ===== 📄 PDF / 파일 =====
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setPins: (pins) => set({ pins }),
  setCurrentPin: (currentPin) => set({ currentPin }),
  togglePdf: (isPdfOpen) => set({ isPdfOpen }),

  // ===== 🧷 핀 편집 =====
  setIsEditingPin: (val) => set({ isEditingPin: val }),

  // ===== 💬 댓글 편집 =====
  setEditingComment: (comment) => set({ editingComment: comment }),

  // ===== ♻️ 초기화 유틸 =====
  clearCurrentPin: () => set({ currentPin: null }),

  clearFileState: () =>
    set({
      selectedFile: null,
      currentPin: null,
      isPdfOpen: false,
    }),

  resetAll: () => set(initialState),
}));
