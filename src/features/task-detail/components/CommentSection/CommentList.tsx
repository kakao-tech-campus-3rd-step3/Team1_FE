import { useEffect, useRef } from 'react';
import CommentItem from './CommentItem';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';

interface CommentListProps {
  comments: CommentUIType[];
  onDelete: (id: string) => void;
  onSelectPin: (fileInfo: FileInfo | null) => void;
}

const CommentList = ({ comments, onDelete, onSelectPin }: CommentListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setEditingComment, editingComment, selectedCommentId, activePinCommentId } =
    useTaskDetailStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div ref={scrollRef} className="px-4 flex-1 overflow-y-auto pb-35">
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          isEditing={editingComment?.id === comment.commentId}
          isSelected={comment.commentId === selectedCommentId}
          isPinHighlighted={comment.commentId === activePinCommentId}
          onEdit={() =>
            setEditingComment({
              id: comment.commentId,
              content: comment.content,
              isAnonymous: comment.isAnonymous,
              fileInfo: comment.fileInfo ?? null,
            })
          }
          onDelete={() => onDelete(comment.commentId)}
          onSelectPin={onSelectPin}
        />
      ))}
    </div>
  );
};

export default CommentList;
