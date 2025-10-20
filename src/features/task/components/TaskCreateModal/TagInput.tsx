import { Button } from '@/shared/components/shadcn/button';
import { Input } from '@/shared/components/shadcn/input';
import { X } from 'lucide-react';
import { useState } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  disabled?: boolean;
}

const TagInput = ({ tags, setTags, disabled }: TagInputProps) => {
  const [tagInput, setTagInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      const trimmed = tagInput.trim();

      if (!tags.includes(trimmed)) {
        const newTags = [...tags, trimmed];
        setTags(newTags);
      }

      setTagInput('');
      e.preventDefault();
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-lg min-h-[44px] bg-gray-100">
      {tags.map((tag, idx) => (
        <span
          key={`${tag}-${idx}`}
          className="bg-boost-blue/20 text-boost-blue px-2 h-7 rounded-md flex items-center gap-2 label2-regular"
        >
          {tag}
          <Button
            size="icon"
            onClick={() => removeTag(idx)}
            className="bg-transparent shadow-none text-boost-blue hover:bg-boost-blue-hover/20 rounded-md w-4 h-4 flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </Button>
        </span>
      ))}
      <Input
        value={tagInput}
        placeholder="태그 입력 후 Enter"
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 h-7 border-none focus:ring-transparent label2-regular"
      />
    </div>
  );
};

export default TagInput;
