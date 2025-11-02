import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/shared/components/shadcn/dropdown-menu';
import { Pin, User, EllipsisVertical } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';

interface CommentItemProps {
  comment: CommentUIType;
  onEdit?: (comment: CommentUIType) => void;
  onDelete?: (commentId: string) => void;
  onSelectPin?: (fileInfo: FileInfo | null) => void;
}

const CommentItem = ({ comment, onEdit, onDelete, onSelectPin }: CommentItemProps) => {
  const isAnonymous = comment.isAnonymous;

  return (
    <div className="flex py-3">
      <div className="flex-1">
        <div className="bg-gray-200 rounded-xl px-4 py-3 shadow-sm relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pb-3">
              <Avatar
                style={{ backgroundColor: comment.authorInfo.backgroundColor }}
                className={cn(
                  'h-8 w-8 shrink-0 shadow-xs text-white text-xs',
                  isAnonymous ? 'bg-gray-400' : 'bg-boost-orange',
                )}
              >
                {isAnonymous ? (
                  <AvatarFallback className="bg-gray-400 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </AvatarFallback>
                ) : comment.authorInfo.avatar ? (
                  <AvatarImage
                    src={getAvatarSrc(comment.authorInfo)}
                    alt={comment.authorInfo.name}
                    className="h-7 w-7 object-cover rounded-full mx-auto my-auto"
                  />
                ) : (
                  <AvatarFallback>
                    {comment.authorInfo.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>

              <span className="label1-bold text-sm text-gray-800">
                {isAnonymous ? '익명' : comment.authorInfo.name}
              </span>
              {comment.isPinned && (
                <Pin
                  onClick={() => {
                    if (onSelectPin) onSelectPin(comment.fileInfo ?? null);
                  }}
                  className="h-3.5 w-3.5 text-boost-blue"
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{comment.timeAgo}</span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-gray-100 rounded-md">
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
                        if (onEdit) onEdit(comment);
                      }}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      수정
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDelete) onDelete(comment.commentId);
                      }}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                    >
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="mt-1 text-sm text-gray-800">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
