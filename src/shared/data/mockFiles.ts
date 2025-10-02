import examplePdfUrl from '@/shared/assets/pdf-example/sample.pdf';

export const mockFiles = [
  {
    id: 1,
    name: 'example.pdf',
    url: examplePdfUrl,
    size: '2MB',
    timeLeft: '5m',
    status: 'uploading',
  },
  {
    id: 2,
    name: 'doc.pdf',
    url: examplePdfUrl,
    size: '1.2MB',
    timeLeft: '10m',
    status: 'success',
  },
];
