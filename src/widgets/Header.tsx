import { Button } from '@/shared/components/shadcn/button';
import { MoreVertical, PlusCircle, UserPlus } from 'lucide-react';

interface HeaderProps {
  title: string;
  showProjectActions?: boolean;
  onProjectManageClick?: () => void;
  onProjectJoinCodeClick?: () => void;
  onTaskCreate: () => void;
}

const Header = ({
  title,
  showProjectActions = false,
  onProjectManageClick,
  onProjectJoinCodeClick,
  onTaskCreate,
}: HeaderProps) => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <div className="flex items-center justify-between w-full h-26 p-6 bg-white shadow-sm">
      <div className="flex flex-col justify-center gap-1">
        <span className="label1-regular text-gray-500">{today}</span>
        <span className="title1-bold !text-3xl">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {showProjectActions && (
          <>
            <Button
              onClick={onProjectManageClick}
              size="icon"
              variant="outline"
              className="border-gray-300"
            >
              <MoreVertical />
            </Button>
            <Button
              onClick={onProjectJoinCodeClick}
              size="icon"
              variant="outline"
              className="border-gray-300"
            >
              <UserPlus />
            </Button>
          </>
        )}

        <Button
          className="text-gray-100 m-2 justify-center bg-boost-blue hover:bg-boost-blue/90 h-8 ml-auto px-3 py-1 rounded"
          onClick={onTaskCreate}
        >
          <PlusCircle />할 일 생성
        </Button>
      </div>
    </div>
  );
};

export default Header;
