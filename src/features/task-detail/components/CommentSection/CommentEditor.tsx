import { useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { Switch } from '@/shared/components/shadcn/switch';
import Boo from '@/shared/assets/images/boost/boo.png';
import { SendIcon } from 'lucide-react';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import toast from 'react-hot-toast';

interface CommentEditorProps {
  onSubmit: (data: { content: string; isAnonymous: boolean }) => void;
}

const CommentEditor = ({ onSubmit }: CommentEditorProps) => {
  const [input, setInput] = useState('');
  const { isAnonymous, setIsAnonymous } = useTaskDetailStore();

  const handleAdd = () => {
    if (!input.trim()) return toast.error('댓글을 입력해주세요!');
    onSubmit({ content: input, isAnonymous });
    setInput('');
  };

  return (
    <div className="absolute left-0 right-0 bottom-0 px-4 pt-4 pb-2 border-t border-gray-300 space-y-2 bg-gray-100">
      <div className="flex items-center gap-2 pb-2">
        <Button
          size="sm"
          className="rounded-full px-3 py-1 text-xs bg-boost-orange hover:bg-boost-orange-hover"
        >
          <img src={Boo} width="20" />
          <p className="label2-bold">Boo가 대신 말하기</p>
        </Button>
        <div className="flex flex-row items-center gap-1.5 ml-1.5">
          <span className="text-sm text-gray-600">익명</span>
          <Switch
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
            className="data-[state=checked]:bg-boost-blue"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Textarea
          className="rounded-md focus:ring-transparent flex-1 h-10 resize-none"
          placeholder="댓글을 입력해주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button
          size="icon"
          className="h-13 w-13 rounded-2xl bg-boost-blue hover:bg-boost-blue-hover flex-shrink-0"
          onClick={handleAdd}
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
};

export default CommentEditor;
