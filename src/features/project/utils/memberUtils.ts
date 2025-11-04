import type { Member } from '@/features/user/types/userTypes';
import type {
  ProjectBoostingScores,
  MemberWithBoosting,
} from '@/features/project/types/projectTypes';

export const combineMembersWithBoostingScores = (
  members: Member[] = [],
  boostingScores: ProjectBoostingScores = [],
): MemberWithBoosting[] => {
  const boostingScoresMap = new Map(boostingScores.map((score) => [score.memberId, score]));

  return members.map((member) => {
    const boosting = boostingScoresMap.get(member.id);
    return {
      ...member,
      totalScore: boosting?.totalScore ?? 0,
      rank: boosting?.rank ?? 0,
      calculatedAt: boosting?.calculatedAt ?? '',
    };
  });
};
