import { useEffect, useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { Switch } from '@/shared/components/shadcn/switch';
import Boo from '@/shared/assets/images/boost/boo.png';
import { SendIcon, X } from 'lucide-react';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import toast from 'react-hot-toast';
import type { FileInfo, PinWithAuthor } from '@/features/task-detail/types/taskDetailType';

interface CommentEditorProps {
  onCreate: (data: { content: string; isAnonymous: boolean; fileInfo?: FileInfo | null }) => void;
  onUpdate: (
    commentId: string,
    data: { content: string; isAnonymous: boolean; fileInfo?: FileInfo | null },
  ) => void;
}

const CommentEditor = ({ onCreate, onUpdate }: CommentEditorProps) => {
  const [input, setInput] = useState('');
  const {
    isAnonymous,
    setIsAnonymous,
    editingComment,
    setEditingComment,
    currentPin,
    setCurrentPin,
  } = useTaskDetailStore();

  useEffect(() => {
    if (editingComment) {
      setInput(editingComment.content);
      setIsAnonymous(editingComment.isAnonymous);

      if (editingComment.fileInfo?.fileId) {
        setCurrentPin(editingComment.fileInfo as PinWithAuthor);
      }
    } else {
      setInput('');
      setCurrentPin(null);
    }
  }, [editingComment, setIsAnonymous, setCurrentPin]);

  const handleSubmit = () => {
    if (!input.trim()) return toast.error('댓글을 입력해주세요!');

    const data = {
      content: input,
      isAnonymous,
      fileInfo: currentPin, 
    };

    if (editingComment) {
      onUpdate(editingComment.id, data);
      setEditingComment(null);
    } else {
      onCreate(data);
    }

    setInput('');
    setCurrentPin(null);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setInput('');
  };

  return (
    <div className="absolute left-0 right-0 bottom-0 px-4 pt-4 pb-2 border-t border-gray-300 space-y-2 bg-gray-100">
      {/* Boo 버튼 & 익명 스위치 */}
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
          {editingComment && (
            <span className="text-sm font-semibold text-boost-blue ml-1">수정중</span>
          )}
        </div>
      </div>

      {/* 입력창 + 버튼 */}
      <div className="flex items-center gap-2">
        <Textarea
          className="rounded-md text-sm focus:ring-transparent flex-1 h-10 resize-none"
          placeholder={editingComment ? '댓글 수정중..' : '댓글을 입력해주세요'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        {editingComment ? (
          <>
            <Button
              size="icon"
              className="h-13 w-13 rounded-2xl bg-boost-blue hover:bg-boost-blue-hover flex-shrink-0"
              onClick={handleSubmit}
            >
              <SendIcon />
            </Button>
            <Button
              size="icon"
              className="h-13 w-13 rounded-2xl bg-gray-400 hover:bg-gray-500 flex-shrink-0"
              onClick={handleCancelEdit}
            >
              <X />
            </Button>
          </>
        ) : (
          <Button
            size="icon"
            className="h-13 w-13 rounded-2xl bg-boost-blue hover:bg-boost-blue-hover flex-shrink-0"
            onClick={handleSubmit}
          >
            <SendIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentEditor;
