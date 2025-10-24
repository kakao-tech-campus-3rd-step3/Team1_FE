import { useState } from 'react';
import { Button } from '@/shared/components/shadcn/button';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { useAiTransformMutation } from '@/features/ai-transform/hooks/useAiTransformMutation';
import type { AiTransformResponse } from '@/features/ai-transform/types/aiTransformTypes';

const AiTransformTestPage = () => {
  const [inputComment, setInputComment] = useState('');
  const [transformedComment, setTransformedComment] = useState<AiTransformResponse | null>(null);

  const { mutate: aiTransformMutate } = useAiTransformMutation(
    (data) => setTransformedComment(data),
    (error) => alert(`변환 실패: ${error.message}`),
  );

  const handleTransform = () => {
    if (!inputComment.trim()) return;
    aiTransformMutate({ text: inputComment });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <h1 className="title1-bold">AI 댓글 변환 테스트 페이지</h1>

      <div className="flex flex-row justify-center items-center gap-4 w-[500px]">
        <Textarea
          placeholder="댓글을 입력해주세요."
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <Button onClick={handleTransform}>변환 버튼</Button>
      </div>

      <div className="w-[500px] p-4 border rounded-md bg-gray-50 min-h-[100px]">
        {transformedComment ? (
          <>
            <p className="subtitle2-bold">원문:</p>
            <p>{transformedComment.originalText}</p>
            <p className="subtitle2-bold mt-2">변환된 댓글:</p>
            <p>{transformedComment.transformedText}</p>
          </>
        ) : (
          <p className="text-gray-400">변환된 댓글이 여기에 표시됩니다.</p>
        )}
      </div>
    </div>
  );
};

export default AiTransformTestPage;
