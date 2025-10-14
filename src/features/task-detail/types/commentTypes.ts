export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  fallback?: string;
  content: string;
  timeAgo: string;
  isPinned?: boolean;
}
