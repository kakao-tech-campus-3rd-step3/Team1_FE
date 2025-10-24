import { useState, useRef, useEffect } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { Switch } from '@/shared/components/shadcn/switch';
import CommentItem from '@/features/task-detail/components/CommentItem';
import Boo from '@/shared/assets/images/boost/boo.png';
import { SendIcon } from 'lucide-react';
import { useCreateComment } from '@/features/comment/hooks/useCreateComment';
import { useCommentQuery } from '@/features/comment/hooks/useCommentQuery';
import type { FileInfo, CommentUIType } from '@/features/comment/types/commentTypes';
import { useDeleteCommentMutation } from '@/features/comment/hooks/useDeleteComment';
import { useUpdateCommentMutation } from '@/features/comment/hooks/useUpdateComment';

interface CommentSectionProps {
  projectId: string;
  taskId: string;
  fileInfo?: FileInfo | null;
  setFileInfo?: (fileInfo: FileInfo | null) => void;
}

const CommentSection = ({ projectId, taskId, fileInfo, setFileInfo }: CommentSectionProps) => {
  const [input, setInput] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: comments = [] } = useCommentQuery(projectId, taskId);
  const { mutate: createComment } = useCreateComment(projectId, taskId);
  const { mutate: deleteComment } = useDeleteCommentMutation(projectId, taskId);
  const { mutate: updateComment } = useUpdateCommentMutation(projectId, taskId);

  const handleAdd = () => {
    if (!input.trim()) return;

    const newCommentData = {
      content: input,
      persona: 'BOO',
      isAnonymous,
      fileInfo: fileInfo ? { ...fileInfo } : {},
    };

    createComment({ commentData: newCommentData });
    if (setFileInfo) setFileInfo({});
    setInput('');
  };
  const handleEdit = (comment: CommentUIType) => {
    setEditingCommentId(comment.commentId);
    setEditInput(comment.content);
  };

  const handleUpdate = (commentId: string) => {
    if (!editInput.trim()) return;
    updateComment({
      commentId,
      updatedData: { content: editInput },
    });
    setEditingCommentId(null);
    setEditInput('');
  };

  const handleDelete = (commentId: string) => {
    deleteComment(commentId);
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
                  onClick={() => handleUpdate(c.commentId)}
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
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ),
        )}
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
