export const calculateDDay = (
  dueDate?: string | null,
  format: 'number' | 'string' | 'text' = 'number',
) => {
  if (!dueDate) return null;

  const due = new Date(dueDate);
  const today = new Date();

  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (format === 'number') {
    return diff;
  }

  if (format === 'string') {
    if (diff === 0) return 'D-DAY';
    return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
  }

  if (format === 'text') {
    if (diff === 0) return '오늘 마감';
    return diff > 0 ? `${diff}일 남음` : `${Math.abs(diff)}일 지남`;
  }

  return diff;
};

export const formatDateTime = (isoString: string): string => {
  if (!isoString) return '';

  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Seoul',
  };

  // “2025년 11월 4일 오전 6:30” 형식 출력
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};
