import { create } from 'zustand';

interface AiTransformState {
  originalText: string;
  transformedText: string | null;
  selectedText: string | null;
  showSelectModal: boolean;

  setOriginalText: (text: string) => void;
  setTransformedText: (text: string) => void;
  setSelectedText: (text: string) => void;
  setShowSelectModal: (show: boolean) => void;
  reset: () => void;
}

export const useAiTransformStore = create<AiTransformState>((set) => ({
  originalText: '',
  transformedText: null,
  selectedText: null,
  showSelectModal: false,

  setOriginalText: (text) => set({ originalText: text }),
  setTransformedText: (text) => set({ transformedText: text }),
  setSelectedText: (text) => set({ selectedText: text }),
  setShowSelectModal: (show) => set({ showSelectModal: show }),
  reset: () =>
    set({
      originalText: '',
      transformedText: null,
      selectedText: null,
      showSelectModal: false,
    }),
}));
