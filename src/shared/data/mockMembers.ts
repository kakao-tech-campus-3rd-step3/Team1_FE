import AvatarKHM from '@/shared/assets/images/khm-avatar.png';
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
    id: '7b81b6d1-abbe-4e52-b478-8515d890f9c5',
    name: '유다연',
    avatar: AvatarYDY,
    backgroundColor: 'bg-boost-yellow',
    boostingScore: 120,
  },
  {
    id: 'a3c237e5-6170-4eca-96d6-c0d16ea57d36',
    name: '김혜민',
    avatar: AvatarKHM,
    backgroundColor: 'bg-boost-blue-hover',
    boostingScore: 120,
  },
];
