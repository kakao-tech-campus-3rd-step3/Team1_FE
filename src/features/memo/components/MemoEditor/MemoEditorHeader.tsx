import { Loader2 } from 'lucide-react';
import Rocket from '@/shared/assets/images/boost/rocket-2d.png';
import { Button } from '@/shared/components/shadcn/button';

interface MemoEditorHeaderProps {
  isEditMode: boolean;
  onCancel: () => void;
  handleSave: () => void;
  disableSave: boolean;
  isSaving: boolean;
}

const MemoEditorHeader = ({
  isEditMode,
  onCancel,
  handleSave,
  disableSave,
  isSaving,
}: MemoEditorHeaderProps) => {
  return (
    <div className="flex-shrink-0 bg-white rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="p-2 bg-boost-blue/10 rounded-lg mt-0.5">
            <img src={Rocket} alt="rocket" className="w-8 h-8" />
          </div>
          <div>
            <h2 className="title2-bold text-gray-900 mb-1">
              {isEditMode ? '메모 수정' : '새 메모 작성'}
            </h2>
            <p className="label1-regular text-gray-600">
              기록하고 싶은 내용을 적어보세요! 팀원들과 공유할 수 있어요.
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            취소
          </Button>
          <Button variant="defaultBoost" onClick={handleSave} disabled={disableSave}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                저장 중...
              </>
            ) : (
              '저장'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoEditorHeader;
