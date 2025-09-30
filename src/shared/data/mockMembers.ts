import AvatarLJH from '@/shared/assets/images/ljh-avatar.png';
import AvatarKWH from '@/shared/assets/images/kwh-avatar.png';
import AvatarKHM from '@/shared/assets/images/khm-avatar.png';
import AvatarSYJ from '@/shared/assets/images/syj-avatar.png';
import AvatarYDY from '@/shared/assets/images/ydy-avatar.png';

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  backgroundColor?: string;
  boostingScore: number;
}

export const mockMembers: Member[] = [
  {
    id: '1',
    name: '유다연',
    avatar: AvatarYDY,
    backgroundColor: 'bg-boost-yellow',
    boostingScore: 120,
  },
  {
    id: '2',
    name: '김혜민',
    avatar: AvatarKHM,
    backgroundColor: 'bg-boost-blue-hover',
    boostingScore: 120,
  },
  {
    id: '3',
    name: '이진호',
    avatar: AvatarLJH,
    backgroundColor: 'bg-boost-blue',
    boostingScore: 120,
  },
  {
    id: '4',
    name: '서영진',
    avatar: AvatarSYJ,
    backgroundColor: 'bg-boost-orange',
    boostingScore: 120,
  },
  {
    id: '5',
    name: '김원호',
    avatar: AvatarKWH,
    backgroundColor: 'bg-boost-orange-hover',
    boostingScore: 120,
  },
];
