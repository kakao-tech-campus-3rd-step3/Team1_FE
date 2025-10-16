const tagColorMap: Record<string, string> = {
  긴급: 'bg-red-100 text-red-800',
  검토필요: 'bg-green-100 text-green-800',
  검토완료: 'bg-blue-100 text-blue-800',
  마감일: 'bg-green-100 text-green-800',
};

const defaultColors = [
  'bg-yellow-100 text-yellow-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-indigo-100 text-indigo-800',
  'bg-boost-yellow-light/40 text-boost-yellow-dark',
];

interface TaskWithTags {
  urgent?: boolean;
  requiredReviewerCount?: number;
  tags?: string[];
}

// 태그 색상 반환
export function getColorForTag(tag: string) {
  if (tagColorMap[tag]) return tagColorMap[tag];
  const index = tag.charCodeAt(0) % defaultColors.length;
  return defaultColors[index];
}

// 태그 생성
export function generateTags(task: TaskWithTags) {
  const tags: string[] = [];

  if (task.urgent) tags.push('긴급');
  if (task.requiredReviewerCount && task.requiredReviewerCount > 0) tags.push('검토필요');
  if (task.tags) tags.push(...task.tags);

  return tags;
}
