export const columnStatus = [
  { status: 'TODO', title: '진행 전' },
  { status: 'PROGRESS', title: '진행 중' },
  { status: 'REVIEW', title: '검토 중' },
  { status: 'DONE', title: '완료' },
] as const;

// Status 타입: 'TODO' | 'PROGRESS' | 'REVIEW' | 'DONE'
export type Status = (typeof columnStatus)[number]['status'];

// statusList: ['TODO', 'PROGRESS', 'REVIEW', 'DONE']
export const statusList: Status[] = columnStatus.map((c) => c.status);
