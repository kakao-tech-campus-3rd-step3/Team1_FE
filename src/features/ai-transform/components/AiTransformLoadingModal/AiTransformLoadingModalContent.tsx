import AiTransformRotatingBoo from '@/features/ai-transform/components/AiTransformLoadingModal/AiTransformRotatingBoo';
import AiTransformRotatingText from '@/features/ai-transform/components/AiTransformLoadingModal/AiTransformRotatingText';
import AiTransformLoadingDots from '@/features/ai-transform/components/AiTransformLoadingModal/AiTransformLoadingDots';

export const AiTransformLoadingModalContent = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <AiTransformLoadingDots />
      <AiTransformRotatingBoo />
      <AiTransformRotatingText />
    </div>
  );
};

export default AiTransformLoadingModalContent;
