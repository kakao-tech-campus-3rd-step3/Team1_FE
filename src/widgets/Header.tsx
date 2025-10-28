import { Button } from '@/shared/components/shadcn/button';
import { MoreVertical, PlusCircle, UserPlus } from 'lucide-react';

interface HeaderProps {
  title: string;
  showProjectActions?: boolean;
  onProjectManageClick?: () => void;
  onProjectJoinCodeClick?: () => void;
  onCreate: () => void;
  createLabel?: string;
}

const Header = ({
  title,
  showProjectActions = false,
  onProjectManageClick,
  onProjectJoinCodeClick,
  onCreate,
  createLabel = '할 일 생성',
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

        <Button variant="defaultBoost" className="h-8" onClick={onCreate}>
          <PlusCircle />
          {createLabel}
        </Button>
      </div>
    </div>
  );
};

export default Header;
