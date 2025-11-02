import { useState, useRef, useEffect } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { Switch } from '@/shared/components/shadcn/switch';
import CommentItem from '@/features/task-detail/components/CommentSection/CommentItem';
import Boo from '@/shared/assets/images/boost/boo.png';
import { SendIcon } from 'lucide-react';
import { useCommentQuery } from '@/features/comment/hooks/useCommentQuery';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { useDeleteCommentMutation } from '@/features/comment/hooks/useDeleteCommentMutation';
import { useUpdateCommentMutation } from '@/features/comment/hooks/useUpdateCommentMutation';
import { useCreateCommentMutation } from '@/features/comment/hooks/useCreateCommentMutation';
import { useAiTransformStore } from '@/features/ai-transform/store/useAiTransformStore';
import { useAiTransformModals } from '@/features/ai-transform/hooks/useAiTransformModals';
import toast from 'react-hot-toast';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { useTaskDetailQuery } from '@/features/task/hooks/useTaskDetailQuery';
import { useCommentSelect } from '@/features/task-detail/hooks/useCommentSelect';

interface CommentSectionProps {
  projectId: string;
  taskId: string;
  onCommentsFetched?: (comments: CommentUIType[]) => void;
}

const CommentSection = ({ projectId, taskId, onCommentsFetched }: CommentSectionProps) => {
  const [input, setInput] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: comments = [] } = useCommentQuery(projectId, taskId);
  const { mutate: createComment } = useCreateCommentMutation(projectId, taskId);
  const { mutate: deleteComment } = useDeleteCommentMutation(projectId, taskId);
  const { mutate: updateComment } = useUpdateCommentMutation(projectId, taskId);
  const prevCommentsRef = useRef<CommentUIType[] | null>(null);
  const { selectedFile, currentPin, setSelectedFile, setCurrentPin, pins } = useTaskDetailStore();
  const { commentSelect } = useCommentSelect();

  const { data: task } = useTaskDetailQuery(projectId, taskId);

  const handlePinClick = (fileInfo: FileInfo | null) => {
    if (!fileInfo) return;
    if (!task?.files) return;
    commentSelect(fileInfo, task.files, pins);
  };
  useEffect(() => {
    if (!onCommentsFetched) return;
    if (
      comments.length > 0 &&
      JSON.stringify(prevCommentsRef.current) !== JSON.stringify(comments)
    ) {
      onCommentsFetched(comments);
      prevCommentsRef.current = comments;
    }
  }, [comments, onCommentsFetched]);

  const { showAiTransformConfirmModal } = useAiTransformModals();
  const setOriginalText = useAiTransformStore((state) => state.setOriginalText);
  const selectedText = useAiTransformStore((state) => state.selectedText);

  useEffect(() => {
    if (selectedText) setInput(selectedText);
  }, [selectedText]);

  const handleBooClick = () => {
    if (!input.trim()) {
      toast.error('댓글을 입력해주세요!');
      return;
    }
    setOriginalText(input);
    showAiTransformConfirmModal();
  };

  const handleAdd = () => {
    if (!input.trim()) return;

    const newCommentData = {
      content: input,
      persona: 'BOO' as const,
      isAnonymous,
      fileInfo: selectedFile
        ? {
            fileId: selectedFile.fileId,
            fileName: selectedFile.fileName,
            filePage: currentPin?.filePage ?? undefined,
            fileX: currentPin?.fileX ?? undefined,
            fileY: currentPin?.fileY ?? undefined,
          }
        : {},
    };

    createComment({ commentData: newCommentData });
    //⚠️ TODO: fileInfo =null 이면 500 에러 발생
    setCurrentPin(null);

    if (setSelectedFile) setSelectedFile({});

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

  const handleDelete = (commentId: string) => deleteComment(commentId);

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
              onSelectPin={handlePinClick}
            />
          ),
        )}
      </div>

      <div className="absolute left-0 right-0 bottom-0 px-4 pt-4 pb-2 border-t border-gray-300 space-y-2 bg-gray-100">
        <div className="flex items-center gap-2 pb-2">
          <Button
            size="sm"
            className="rounded-full px-3 py-1 text-xs bg-boost-orange hover:bg-boost-orange-hover"
            onClick={handleBooClick}
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
