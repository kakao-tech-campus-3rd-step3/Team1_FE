import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Pin, User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { useAuthStore } from '@/features/auth/store/authStore';
import { CommentActionsMenu } from '@/features/task-detail/components/CommentSection/CommentActionsMenu';

interface CommentItemProps {
  comment: CommentUIType;
  onEdit?: (comment: CommentUIType) => void;
  onDelete?: (commentId: string) => void;
  onSelectPin?: (fileInfo: FileInfo | null) => void;
  isEditing?: boolean;
  isHighlighted?: boolean; // ✅ 강조 여부 추가
}

const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  onSelectPin,
  isEditing,
  isHighlighted, // ✅ 추가
}: CommentItemProps) => {
  const isAnonymous = comment.isAnonymous;
  const { user } = useAuthStore();
  const isAuthor = user?.id === comment.authorInfo.memberId;

  return (
    <div className="flex py-3">
      <div className="flex-1">
        <div
          onClick={() => onSelectPin?.(comment.fileInfo ?? null)}
          className={cn(
            'rounded-xl px-4 py-3 shadow-sm relative transition-all duration-200 border bg-gray-200 border-gray-200',
            isEditing && 'bg-boost-blue/5 border-boost-blue/40',
            isHighlighted && 'border-2 border-boost-blue bg-boost-blue/10',
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pb-3">
              <Avatar
                className={cn(
                  'h-8 w-8 shrink-0 shadow-xs text-white text-xs flex items-center justify-center',
                  isAnonymous && 'bg-gray-500',
                )}
                style={{
                  backgroundColor: !isAnonymous ? comment.authorInfo.backgroundColor : undefined,
                }}
              >
                {isAnonymous ? (
                  <User className="w-4 h-4 text-white" />
                ) : comment.authorInfo.avatar ? (
                  <AvatarImage
                    src={getAvatarSrc(comment.authorInfo)}
                    alt={comment.authorInfo.name}
                    className="h-7 w-7 object-cover rounded-full"
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
              {comment.isPinned && <Pin className="h-3.5 w-3.5 text-boost-blue cursor-pointer" />}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{comment.timeAgo}</span>
              {isAuthor && (
                <CommentActionsMenu
                  onEdit={() => onEdit?.(comment)}
                  onDelete={() => onDelete?.(comment.commentId)}
                />
              )}
            </div>
          </div>

          <p className="mt-1 text-sm text-gray-800">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
