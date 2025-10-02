import { useState, useRef, useEffect } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { Switch } from '@/shared/components/shadcn/switch';
import CommentItem from '@/features/task-detail/components/CommentItem';
import type { Comment } from '@/features/task-detail/types/commentTypes';
import { mockComments } from '@/shared/data/mockComments';
import { v4 as uuidv4 } from 'uuid';
import AvatarYDY from '@/shared/assets/images/ydy-avatar.png';
import Boo from '@/shared/assets/images/boo.png';
import { SendIcon } from 'lucide-react';

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [input, setInput] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentUserName = '유다연';

  const handleAdd = () => {
    if (!input.trim()) return;

    setComments((prevComments) => [
      ...prevComments,
      {
        id: uuidv4(),
        author: isAnonymous ? '익명' : currentUserName,
        avatar: isAnonymous ? undefined : AvatarYDY,
        fallback: isAnonymous ? '익' : currentUserName[0],
        content: input,
        timeAgo: '방금 전',
      },
    ]);

    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="bg-gray-100 border-none flex flex-col h-full relative">
      <h2 className="px-4 py-3 font-semibold border-b border-gray-300 text-gray-800">
        댓글 ({comments.length})
      </h2>

      <div ref={scrollRef} className="px-4 flex-1 overflow-y-auto pb-35">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>

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
    </div>
  );
};

export default CommentSection;
