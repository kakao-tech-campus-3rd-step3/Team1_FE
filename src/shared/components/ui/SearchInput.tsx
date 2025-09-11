import { Input } from '@/shared/components/shadcn/input';
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        className="w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-transparent placeholder-gray-400 transition"
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default SearchInput;
