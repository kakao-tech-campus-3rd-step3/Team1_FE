import { create } from 'zustand';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';

interface TaskDetailState {
  selectedFile: FileInfo | null;
  currentPin: PinWithAuthor | null;
  pins: PinWithAuthor[];
  isPdfOpen: boolean;
  isAnonymous: boolean;
  isEditingPin: boolean;
  setIsEditingPin: (val: boolean) => void;
  setIsAnonymous: (val: boolean) => void;
  setSelectedFile: (fileInfo: FileInfo | null) => void;
  setPins: (pins: PinWithAuthor[]) => void;
  setCurrentPin: (pin: PinWithAuthor | null) => void;
  togglePdf: (open: boolean) => void;

  clearCurrentPin: () => void; // 현재 핀의 상태 초기화
  clearFileState: () => void; //PDF 닫기 시 사용
  resetAll: () => void; // 뒤로가기 시 전체 초기화
}

const initialState = {
  selectedFile: null,
  currentPin: null,
  pins: [],
  isPdfOpen: false,
  isAnonymous: false,
};

export const useTaskDetailStore = create<TaskDetailState>((set) => ({
  ...initialState,

  setIsAnonymous: (val) => set({ isAnonymous: val }),
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setPins: (pins) => set({ pins }),
  setCurrentPin: (currentPin) => set({ currentPin }),
  togglePdf: (isPdfOpen) => set({ isPdfOpen }),
  isEditingPin: false,

  setIsEditingPin: (val) => set({ isEditingPin: val }),
  clearCurrentPin: () => set({ currentPin: null }),
  clearFileState: () =>
    set({
      selectedFile: null,
      currentPin: null,
      isPdfOpen: false,
    }),

  resetAll: () => set(initialState),
}));
