import type { FileInfo } from '@/features/comment/types/commentTypes';
import { create } from 'zustand';

interface TaskDetailState {
  selectedFile: FileInfo | null;
  currentPin: FileInfo | null;
  pins: FileInfo[];
  isPdfOpen: boolean;

  setSelectedFile: (fileInfo: FileInfo|null) => void;
  setPins: (pins: FileInfo[]) => void;
  setCurrentPin: (pin: FileInfo | null) => void;
  togglePdf: (open: boolean) => void;
}
export const useTaskDetailStore = create<TaskDetailState>((set) => ({
  selectedFile: null,
  currentPin: null,
  pins: [],
  isPdfOpen: false,
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setPins: (pins) => set({ pins }),
  setCurrentPin: (currentPin) => set({ currentPin }),
  togglePdf: (isPdfOpen) => set({ isPdfOpen }),
}));
