import type { Member } from '@/features/user/types/userTypes';
import type { ROLES } from '@/features/project/constants/projectConstants';

export type Project = {
  id: string;
  projectId?: string; // API 응답용
  name: string;
  defaultReviewerCount: number;
  role: Role;
  isNotificationEnabled: boolean;
};

export type MemberBoostingScore = {
  memberId: string;
  totalScore: number;
  rank: number;
  calculatedAt: string;
};

export type ProjectBoostingScores = MemberBoostingScore[];

export interface MemberWithBoosting extends Member {
  totalScore: number;
  rank: number;
  calculatedAt: string;
}

export interface JoinCodeResponse {
  joinCode: string;
  expiresAt: string;
}

export type Role = (typeof ROLES)[keyof typeof ROLES];
