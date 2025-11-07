import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTagFilterStore } from '@/features/tag/store/useTagFilterStore';
import { useTagsQuery } from '@/features/tag/hooks/useTagsQuery';
import { cn } from '@/shared/lib/utils';
import { Check, Tag as TagIcon } from 'lucide-react';
import { Badge } from '@/shared/components/shadcn/badge';
import { getColorStyleForTag } from '@/features/tag/utils/tagUtils';
import TagChip from '@/features/tag/components/TagChip';
import { Input } from '@/shared/components/shadcn/input';

const TagSearchInput = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: allTags = [] } = useTagsQuery(projectId!);
  const { selectedTags, addTag, removeTag, clearTags } = useTagFilterStore();

  useEffect(() => {
    clearTags();
  }, [projectId, clearTags]);

  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedInput = input.trim().toLowerCase();
  const filteredTags = allTags.filter((t) => t.name.toLowerCase().includes(normalizedInput));

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const isInDropdown = target.closest('[data-radix-popper-content-wrapper]');
      if (isInDropdown) return;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-[300px]">
      <div
        className={cn(
          'flex items-center w-full rounded-lg border border-gray-300 bg-white transition-all duration-200 hover:border-gray-400 focus-within:border-gray-500',
          'h-10 px-3',
        )}
      >
        <TagIcon className="text-gray-400 w-4.5 h-4.5 mr-2 shrink-0" />

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
          {selectedTags.map((tag) => (
            <TagChip key={tag.tagId} tag={tag} onRemove={removeTag} />
          ))}

          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const match = allTags.find((t) => t.name.toLowerCase() === normalizedInput);

                if (match) {
                  const isSelected = selectedTags.some((t) => t.tagId === match.tagId);
                  if (isSelected) removeTag(match.tagId);
                  else addTag(match);
                  setInput('');
                  inputRef.current?.focus();
                }
              }
            }}
            placeholder={selectedTags.length === 0 ? '태그 검색' : ''}
            className="flex-1 min-w-[120px] h-8 border-none focus:ring-transparent label2-regular bg-transparent placeholder:text-gray-400"
          />
        </div>
      </div>

      <div
        className={cn(
          'absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-sm max-h-50 overflow-auto z-50 transition-all duration-200',
          isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => {
            const isSelected = selectedTags.some((t) => t.tagId === tag.tagId);
            const TagStyle = getColorStyleForTag(tag);

            return (
              <div
                key={tag.tagId}
                onClick={() => {
                  if (isSelected) removeTag(tag.tagId);
                  else addTag(tag);
                  setInput('');
                  inputRef.current?.focus();
                }}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors hover:bg-gray-50"
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-boost-blue border-boost-blue'
                      : 'border-gray-300 hover:border-gray-400',
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <Badge className="px-3 py-1 shadow-sm" style={TagStyle}>
                  {tag.name}
                </Badge>
              </div>
            );
          })
        ) : input ? (
          <div className="p-3 text-sm text-gray-500">{`"${input}"에 대한 검색 결과가 없습니다.`}</div>
        ) : (
          <div className="p-3 text-sm text-gray-500">태그를 검색하세요</div>
        )}
      </div>
    </div>
  );
};

export default TagSearchInput;
