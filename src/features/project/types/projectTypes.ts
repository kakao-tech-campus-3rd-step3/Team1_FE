import type { Member } from '@/features/user/types/userTypes';

export type Project = {
  id: string;
  projectId?: string; // API 응답용
  name: string;
  defaultReviewerCount: number;
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
