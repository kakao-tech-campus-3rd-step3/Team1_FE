import AvatarYDY from '@/shared/assets/images/ydy-avatar.png';
import AvatarKHM from '@/shared/assets/images/khm-avatar.png';

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  backgroundColor?: string;
  boostingScore: number;
}

export const mockMembers: Member[] = [
  {
    id: 'bef50c0f-edd7-421c-8509-7c9dc279dfc7',
    name: '유다연',
    avatar: AvatarYDY,
    backgroundColor: 'bg-boost-yellow',
    boostingScore: 120,
  },
  {
    id: '48a9ecc3-a973-4299-b3ef-a20706344ab6',
    name: '유서연',
    avatar: AvatarYDY,
    backgroundColor: 'bg-boost-yellow',
    boostingScore: 120,
  },
  // 📍TODO: 참여 팀원 목록 조회 API 구현 이전까지 혜민님 ID 넣어서 Test 해주세요!
  {
    id: '',
    name: '김혜민',
    avatar: AvatarKHM,
    backgroundColor: 'bg-boost-yellow',
    boostingScore: 120,
  },
];
