import examplePdfUrl from '@/shared/assets/pdf-example/sample.pdf';
import examplePdfUrl from '@/shared/assets/pdf-example/sample.pdf';
import examplePptUrl from '@/shared/assets/pdf-example/sample.pptx';

export const mockFiles = [
  {
    id: 1,
    name: 'design-doc.pdf',
    url: examplePdfUrl,
    size: '2MB',
    timeLeft: '5m',
    status: 'uploading',
    type: 'design',
    fileType: 'pdf', // 파일 종류 추가
  },
  {
    id: 2,
    name: 'backend-spec.pdf',
    url: examplePdfUrl,
    size: '1.2MB',
    timeLeft: '10m',
    status: 'success',
    type: 'backend',
    fileType: 'pdf',
  },
  {
    id: 3,
    name: 'frontend-guide.pdf',
    url: examplePdfUrl,
    size: '3MB',
    timeLeft: '15m',
    status: 'pending',
    type: 'frontend',
    fileType: 'pdf',
  },
  {
    id: 4,
    name: 'qa-checklist.pptx',
    url: examplePptUrl,
    size: '4MB',
    timeLeft: '20m',
    status: 'uploading',
    type: 'qa',
    fileType: 'ppt',
  },
  {
    id: 5,
    name: 'deployment-plan.pptx',
    url: examplePptUrl,
    size: '5MB',
    timeLeft: '12m',
    status: 'success',
    type: 'devops',
    fileType: 'ppt',
  },
  {
    id: 6,
    name: 'team-meeting.pptx',
    url: examplePptUrl,
    size: '2.5MB',
    timeLeft: '7m',
    status: 'pending',
    type: 'management',
    fileType: 'ppt',
  },
];
