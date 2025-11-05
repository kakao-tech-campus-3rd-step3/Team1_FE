import { useRef, useEffect } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { Textarea } from '@/shared/components/shadcn/textarea';
import CommentItem from './CommentItem';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';

interface CommentListProps {
  comments: CommentUIType[];
  editingCommentId: string | null;
  editInput: string;
  setEditingCommentId: (id: string | null) => void;
  setEditInput: (v: string) => void;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onSelectPin: (fileInfo: FileInfo | null) => void;
}

const CommentList = ({
  comments,
  editingCommentId,
  editInput,
  setEditingCommentId,
  setEditInput,
  onUpdate,
  onDelete,
  onSelectPin,
}: CommentListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div ref={scrollRef} className="px-4 flex-1 overflow-y-auto pb-35">
      {comments.map((c) =>
        editingCommentId === c.commentId ? (
          <div key={c.commentId} className="flex flex-col py-2">
            <Textarea
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              className="mb-2 resize-none"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-boost-blue hover:bg-boost-blue-hover text-white"
                onClick={() => onUpdate(c.commentId, editInput)}
              >
                저장
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingCommentId(null);
                  setEditInput('');
                }}
              >
                취소
              </Button>
            </div>
          </div>
        ) : (
          <CommentItem
            key={c.commentId}
            comment={c}
            onEdit={() => {
              setEditingCommentId(c.commentId);
              setEditInput(c.content);
            }}
            onDelete={onDelete}
            onSelectPin={onSelectPin}
          />
        ),
      )}
    </div>
  );
};

export default CommentList;
