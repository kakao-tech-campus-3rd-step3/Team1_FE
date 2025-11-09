import { create } from 'zustand';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import type { PersonaType } from '@/features/comment/constants/personaConstants';

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
  activePinCommentId: string | null;

  editingComment: EditingCommentState | null;
  persona: PersonaType;

  setPersona: (persona: TaskDetailState['persona']) => void;
  setSelectedFile: (fileInfo: FileInfo | null) => void;
  setCurrentPin: (pin: PinWithAuthor | null) => void;
  setPins: (pins: PinWithAuthor[]) => void;
  togglePdf: (open: boolean) => void;
  setIsEditingPin: (val: boolean) => void;
  setIsAnonymous: (val: boolean) => void;

  setSelectedCommentId: (id: string | null) => void;
  setActivePinCommentId: (id: string | null) => void;

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
  activePinCommentId: null,

  editingComment: null,
  persona: null,
};

export const useTaskDetailStore = create<TaskDetailState>((set) => ({
  ...initialState,

  setPersona: (persona) => set({ persona }),
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setCurrentPin: (currentPin) => set({ currentPin }),
  setPins: (pins) => set({ pins }),
  togglePdf: (isPdfOpen) => set({ isPdfOpen }),
  setIsEditingPin: (val) => set({ isEditingPin: val }),
  setIsAnonymous: (val) => set({ isAnonymous: val }),

  setSelectedCommentId: (id) => set({ selectedCommentId: id }),
  setActivePinCommentId: (id) => set({ activePinCommentId: id }),

  setEditingComment: (comment) =>
    set((state) => ({
      editingComment: comment,
      activePinCommentId: comment ? null : state.activePinCommentId,
    })),
  clearCurrentPin: () => set({ currentPin: null }),

  clearFileState: () =>
    set({
      selectedFile: null,
      currentPin: null,
      isPdfOpen: false,
      persona: null,
      isAnonymous: false,

      activePinCommentId: null,
      selectedCommentId: null,
    }),

  resetAll: () => set(initialState),
}));
