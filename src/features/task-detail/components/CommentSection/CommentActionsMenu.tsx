import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/shared/components/shadcn/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

interface CommentActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const CommentActionsMenu = ({ onEdit, onDelete }: CommentActionsMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="p-1 hover:bg-gray-100 rounded-md" onClick={(e) => e.stopPropagation()}>
        <EllipsisVertical className="w-4 h-4 text-gray-600" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="w-32 bg-white rounded-lg shadow-md border border-gray-200"
    >
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          수정
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
        >
          삭제
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);
