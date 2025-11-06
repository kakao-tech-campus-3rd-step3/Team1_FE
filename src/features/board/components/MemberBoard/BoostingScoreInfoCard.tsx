import { CircleQuestionMark } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/shadcn/hover-card';
import { formatDateTime } from '@/shared/utils/dateUtils';

interface BoostingScoreInfoCardProps {
  calculatedAt: string;
}

const BoostingScoreInfoCard = ({ calculatedAt }: BoostingScoreInfoCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <CircleQuestionMark className="w-4 h-4 text-white ml-1" />
      </HoverCardTrigger>
      <HoverCardContent className="w-[450px] border-gray-300 bg-white/70" side="top" align="start">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-semibold mb-1">🔎 Boosting Score는 무엇인가요?</h4>
            <p className="label2-regular">
              <strong>팀 활동 참여도</strong>를 점수로 확인할 수 있는 <strong>공헌도 시스템</strong>
              이에요. 점수는 할 일 참여, 댓글 작성, 승인 개수를 기반으로 계산되며, 가장 높은 점수를
              가진 팀원에게는 <strong>왕관</strong>이 부여됩니다! 활발히 참여하시고 점수를
              올려보세요!
            </p>
            <div className="text-muted-foreground label2-regular mt-3">
              최근 계산 업데이트 {formatDateTime(calculatedAt)}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default BoostingScoreInfoCard;
