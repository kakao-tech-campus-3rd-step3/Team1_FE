import { Input } from '@/shared/components/shadcn/input';
import { Label } from '@/shared/components/shadcn/label';
import { Type } from 'lucide-react';

interface MemoEditorTitleProps {
  title: string;
  setTitle: (val: string) => void;
}

const MemoEditorTitle = ({ title, setTitle }: MemoEditorTitleProps) => {
  return (
    <div className="flex-shrink-0 bg-white rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4">
      <Label className="flex mb-3 items-center label1-bold text-gray-700">
        <Type className="w-4 h-4 text-gray-500" />
        제목
      </Label>
      <Input
        type="text"
        placeholder="메모 제목을 입력하세요"
        className="w-full border-gray-300 focus:ring-transparent"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default MemoEditorTitle;
