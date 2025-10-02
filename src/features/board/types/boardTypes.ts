export const columnStatus = [
  { status: 'TODO', title: '진행 전' },
  { status: 'PROGRESS', title: '진행 중' },
  { status: 'REVIEW', title: '검토 중' },
  { status: 'DONE', title: '완료' },
] as const;

export type Status = (typeof columnStatus)[number]['status'];
