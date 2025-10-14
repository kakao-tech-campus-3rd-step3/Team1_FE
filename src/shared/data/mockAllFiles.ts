import type { FileType } from '@/features/file/types/fileTypes';
import examplePdfUrl from '@/shared/assets/pdf-example/sample.pdf';

export const mockAllFiles: FileType[] = [
  {
    id: 1,
    name: 'Wireframe_8.pdf',
    type: 'pdf',
    url: examplePdfUrl,
    sizeBytes: 2_400_000, // 2.4 MB
    date: '2024-10-01',
    taskNum: 1,
    taskName: 'Wireframe 제작',
  },
  {
    id: 2,
    name: 'Design_System.pdf',
    type: 'pdf',
    url: examplePdfUrl,
    sizeBytes: 3_100_000, // 3.1 MB
    date: '2024-09-28',
    taskNum: 2,
    taskName: '디자인 시스템 구성',
  },
  {
    id: 3,
    name: 'UI_Mockup.pdf',
    type: 'pdf',
    url: examplePdfUrl,
    sizeBytes: 1_800_000, // 1.8 MB
    date: '2024-10-03',
    taskNum: 3,
    taskName: 'UI 목업 제작',
  },
  {
    id: 4,
    name: 'Project_Plan.pdf',
    type: 'pdf',
    url: examplePdfUrl,
    sizeBytes: 956_000, // 956 KB
    date: '2024-10-02',
    taskNum: 4,
    taskName: '프로젝트 계획 수립',
  },
  {
    id: 5,
    name: 'User_Research.pdf',
    type: 'pdf',
    url: examplePdfUrl,
    sizeBytes: 2_200_000, // 2.2 MB
    date: '2024-09-30',
    taskNum: 5,
    taskName: '사용자 리서치',
  },
  {
    id: 6,
    name: 'Style_Guide.ppt',
    type: 'ppt',
    url: examplePdfUrl,
    sizeBytes: 1_500_000, // 1.5 MB
    date: '2024-09-29',
    taskNum: 6,
    taskName: '스타일 가이드 작성',
  },
];
