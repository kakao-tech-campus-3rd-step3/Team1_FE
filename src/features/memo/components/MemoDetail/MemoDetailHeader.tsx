import { Button } from '@/shared/components/shadcn/button';
import { Calendar, Clock } from 'lucide-react';
import Rocket from '@/shared/assets/images/boost/rocket-2d.png';
import { ROUTES } from '@/app/routes/Router';
import { useNavigate } from 'react-router-dom';
import type { Memo } from '@/features/memo/types/memoTypes';

interface MemoDetailHeaderProps {
  memo: Memo;
  projectId: string;
}

const MemoDetailHeader = ({ memo, projectId }: MemoDetailHeaderProps) => {
  const navigate = useNavigate();

  const handleUpdate = () => navigate(ROUTES.PROJECT_MEMO_EDIT(projectId, memo.id));
  const handleBack = () => navigate(ROUTES.PROJECT_MEMO_LIST(projectId));

  return (
    <div className="flex-shrink-0 p-3 pb-4 space-y-6 border-b border-gray-300">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-1 bg-boost-blue/10 rounded-lg flex-shrink-0">
            <img src={Rocket} alt="rocket" className="w-6 h-6" />
          </div>
          <h1 className="title1-bold text-gray-900 leading-tight truncate">{memo.title}</h1>
        </div>

        <div className="flex flex-row gap-2 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-gray-300 hover:bg-gray-200 cursor-pointer"
          >
            목록으로
          </Button>
          <Button variant="defaultBoost" onClick={handleUpdate}>
            수정
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6 border-t border-gray-100 flex-wrap">
        <div className="flex items-center gap-1 label1-regular text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="font-bold text-gray-700 mx-1">생성일</span>
          <span className="inline">{new Date(memo.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 label1-regular text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="font-bold text-gray-700 mx-1">수정일</span>
          <span className="inline">{new Date(memo.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default MemoDetailHeader;
