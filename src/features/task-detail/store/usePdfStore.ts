import { create } from 'zustand';
import type { Position, Marker, PageSize } from '@/features/task-detail/types/pdfTypes';
import { A4 } from '@/features/task-detail/types/pdfTypes';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { MAX_ZOOM, MIN_ZOOM } from '@/features/task-detail/types/pdfTypes';

interface PdfState {
  numPages: number;
  pageNumber: number;
  zoom: number;
  position: Position;
  isDragging: boolean;
  start: Position;
  markers: Marker[];
  pdfDocument: PDFDocumentProxy | null;
  pageSize: PageSize;

  setNumPages: (num: number) => void;
  goPrevPage: () => void;
  goNextPage: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  startDrag: (pos: Position) => void;
  updatePosition: (pos: Position) => void;
  stopDrag: () => void;
  addMarker: (marker: Marker) => void;
  removeMarker: (id: string) => void;
  clearMarkers: () => void;
  setPdfDocument: (document: PDFDocumentProxy) => void;
  setPageSize: (size: PageSize) => void;
  updatePageSize: (pageNumber: number) => Promise<void>;
}

export const usePdfStore = create<PdfState>((set, get) => ({
  numPages: 0,
  pageNumber: 1,
  zoom: 1,
  position: { x: 0, y: 0 },
  isDragging: false,
  start: { x: 0, y: 0 },
  markers: [],
  pdfDocument: null,
  pageSize: { width: A4.WIDTH, height: A4.HEIGHT },

  setNumPages: (num) => set({ numPages: num }),
  goPrevPage: () => set((s) => ({ pageNumber: Math.max(1, s.pageNumber - 1) })),
  goNextPage: () => set((s) => ({ pageNumber: Math.min(s.numPages, s.pageNumber + 1) })),
  zoomIn: () => set((s) => ({ zoom: Math.min(s.zoom * 1.1, MAX_ZOOM) })),
  zoomOut: () => set((s) => ({ zoom: Math.max(s.zoom / 1.1, MIN_ZOOM) })),
  startDrag: (pos) => set({ isDragging: true, start: pos }),
  updatePosition: (pos) => set({ position: pos }),
  stopDrag: () => set({ isDragging: false }),
  addMarker: (marker) => set((s) => ({ markers: [...s.markers, marker] })),
  removeMarker: (id) => set((s) => ({ markers: s.markers.filter((m) => m.id !== id) })),
  clearMarkers: () => set({ markers: [] }),
  setPdfDocument: (document) => set({ pdfDocument: document }),
  setPageSize: (pageSize) => set({ pageSize }),
  updatePageSize: async (pageNumber) => {
    const { pdfDocument } = get();
    if (pdfDocument) {
      try {
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        set({
          pageSize: { width: viewport.width, height: viewport.height },
        });
      } catch (error) {
        console.error('에러 : 페이지 크기 가져오기 실패');
      }
    }
  },
}));
