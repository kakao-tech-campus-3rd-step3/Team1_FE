import MDEditor from '@uiw/react-md-editor';
import { Label } from '@/shared/components/shadcn/label';
import { FileText } from 'lucide-react';

interface MemoEditorContentProps {
  content: string;
  setContent: (val: string) => void;
}

const MemoEditorContent = ({ content, setContent }: MemoEditorContentProps) => {
  return (
    <div className="flex-1 overflow-hidden p-4 pt-1">
      <Label className="flex mb-3 items-center label1-bold text-gray-700">
        <FileText className="w-4 h-4 text-gray-500" />
        내용
      </Label>
      <div className="h-[calc(100%-2rem)]" data-color-mode="light">
        <MDEditor value={content} onChange={(val) => setContent(val || '')} height="100%" />
      </div>
    </div>
  );
};

export default MemoEditorContent;
