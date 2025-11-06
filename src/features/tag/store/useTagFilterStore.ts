import { create } from 'zustand';
import type { Tag } from '@/features/tag/types/tagTypes';

interface TagFilterStore {
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  addTag: (tag: Tag) => void;
  removeTag: (tagId: string) => void;
  clearTags: () => void;
}

export const useTagFilterStore = create<TagFilterStore>((set) => ({
  selectedTags: [],
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  addTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.some((t) => t.tagId === tag.tagId)
        ? state.selectedTags
        : [...state.selectedTags, tag],
    })),
  removeTag: (tagId) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t.tagId !== tagId),
    })),
  clearTags: () => set({ selectedTags: [] }),
}));
