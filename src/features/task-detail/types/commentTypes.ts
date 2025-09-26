import AvatarLJH from '@/shared/assets/images/ljh-avatar.png';
import AvatarKWH from '@/shared/assets/images/kwh-avatar.png';
import AvatarKHM from '@/shared/assets/images/khm-avatar.png';
import AvatarSYJ from '@/shared/assets/images/syj-avatar.png';

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  fallback?: string;
  content: string;
  timeAgo: string;
  isPinned?: boolean;
}

export const mockComments: Comment[] = [
  {
    id: '1',
    author: '서영진',
    avatar: AvatarSYJ,
    fallback: '서',
    content: '길동님, 글로벌 경기 침체에 대한 통계지표도 함께 첨부하면 좋을 것 같아요!',
    timeAgo: '3 hour',
    isPinned: true,
  },
  {
    id: '2',
    author: '이진호',
    avatar: AvatarLJH,
    fallback: '이',
    content: '여기 오타 있어요! 수정해주세요!',
    timeAgo: '1 hour',
  },
  {
    id: '3',
    author: '김혜민',
    avatar: AvatarKHM,
    fallback: '김',
    content: '다른 나라도 더 추가하면 좋을 것 같아요!',
    timeAgo: '58 min',
  },
  {
    id: '4',
    author: '익명',
    fallback: '익',
    content: '이 부분 내용은 빼는 것이 좋을 것 같아요! 앞 문장과 이어지는 내용이 아닌 것 같아요.',
    timeAgo: '32 min',
  },
  {
    id: '5',
    author: '김원호',
    avatar: AvatarKWH,
    fallback: '김',
    content: '여기 내용이 조금 이해하기 어려워서요! 혹시 참고할 자료도 함께 첨부해주실 수 있나요?',
    timeAgo: '14 min',
  },
];
