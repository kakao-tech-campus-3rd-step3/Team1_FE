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

export const formatShortDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(date).replace('.', '').replace('.', '.');
};
