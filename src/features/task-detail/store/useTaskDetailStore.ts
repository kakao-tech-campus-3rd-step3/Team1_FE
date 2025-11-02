import { create } from 'zustand';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
interface TaskDetailState {
  selectedFile: FileInfo | null;
  currentPin: PinWithAuthor | null;
  pins: PinWithAuthor[];
  isPdfOpen: boolean;

  setSelectedFile: (fileInfo: FileInfo | null) => void;
  setPins: (pins: PinWithAuthor[]) => void;
  setCurrentPin: (pin: PinWithAuthor | null) => void;
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
