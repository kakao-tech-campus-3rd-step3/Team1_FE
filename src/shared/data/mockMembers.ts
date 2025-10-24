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
    id: 'c8decc22-45e4-4609-a2d8-e2c7446ac99e',
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
  {
    id: 'ccc87f56-7c1c-42c7-8b82-54d5b2306e0c',
    name: '김혜민',
    avatar: AvatarKHM,
    backgroundColor: 'bg-boost-orange',
    boostingScore: 120,
  },
];
