import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCreateMemoMutation } from '@/features/memo/hooks/useCreateMemoMutation';
import { useUpdateMemoMutation } from '@/features/memo/hooks/useUpdateMemoMutation';
import { useMemoQuery } from '@/features/memo/hooks/useMemoQuery';
import { useMemoModals } from '@/features/memo/hooks/useMemoModals';
import MemoEditorHeader from '@/features/memo/components/MemoEditor/MemoEditorHeader';
import MemoEditorTitle from '@/features/memo/components/MemoEditor/MemoEditorTitle';
import MemoEditorContent from '@/features/memo/components/MemoEditor/MemoEditorContent';

const MemoEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { projectId, memoId } = useParams<{ projectId: string; memoId?: string }>();

  const { data: memo, isLoading } = useMemoQuery(projectId ?? '', memoId ?? '');
  const createMutation = useCreateMemoMutation(projectId ?? '');
  const updateMutation = useUpdateMemoMutation(projectId ?? '', memoId ?? '');
  const { showEmptyFieldsModal, showUnsavedChangesModal } = useMemoModals();

  const isEditMode = !!memoId;

  useEffect(() => {
    if (!isEditMode || !memo) return;

    setTitle(memo.title);
    setContent(memo.content);
  }, [memo, isEditMode]);

  if (!projectId) return <div className="p-4">프로젝트 ID를 찾을 수 없습니다.</div>;

  if (isLoading && isEditMode)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      showEmptyFieldsModal();
      return;
    }

    if (isEditMode) updateMutation.mutate({ title, content });
    else createMutation.mutate({ title, content });
  };

  const handleCancel = () => showUnsavedChangesModal(projectId, navigate);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100 border-t border-gray-300">
      <div className="flex flex-col gap-4 p-4 h-full overflow-hidden">
        <MemoEditorHeader
          isEditMode={isEditMode}
          onCancel={handleCancel}
          handleSave={handleSave}
          disableSave={!title.trim() || createMutation.isPending || updateMutation.isPending}
          isSaving={createMutation.isPending || updateMutation.isPending}
        />
        <MemoEditorTitle title={title} setTitle={setTitle} />
        <MemoEditorContent content={content} setContent={setContent} />
      </div>
    </div>
  );
};

export default MemoEditor;
