import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Pin, User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { CommentUIType } from '@/features/comment/types/commentTypes';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import type { FileInfo } from '@/features/task-detail/types/taskDetailType';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { CommentActionsMenu } from '@/features/task-detail/components/CommentSection/CommentActionsMenu';
import BOO from '@/shared/assets/images/boost/boo.png';
interface CommentItemProps {
  comment: CommentUIType;
  onEdit?: (comment: CommentUIType) => void;
  onDelete?: (commentId: string) => void;
  onSelectPin?: (fileInfo: FileInfo | null) => void;
  isEditing?: boolean;
  isHighlighted?: boolean;
}

const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  onSelectPin,
  isEditing,
  isHighlighted,
}: CommentItemProps) => {
  const isAnonymous = comment.isAnonymous;
  const { user } = useAuthStore();
  const isAuthor = user?.id === comment.authorInfo.memberId;
  const isBooPersona = comment.persona === 'BOO';

  const effectiveAnonymous = isBooPersona ? true : comment.isAnonymous;

  const renderAvatar = () => {
    if (isBooPersona) {
      return (
        <Avatar className="flex items-center justify-center h-8 w-8 shrink-0 shadow-xs bg-boost-yellow">
          <AvatarImage className="w-6 h-6" src={BOO} alt="BOO" />
          <AvatarFallback>BOO</AvatarFallback>
        </Avatar>
      );
    }

    if (effectiveAnonymous) {
      return (
        <Avatar className="flex items-center justify-center h-8 w-8 shrink-0 shadow-xs bg-gray-500">
          <User className="w-4 h-4 text-white" />
        </Avatar>
      );
    }

    return (
      <Avatar
        className="flex items-center justify-center h-8 w-8 shrink-0 shadow-xs text-white text-xs"
        style={{
          backgroundColor: comment.authorInfo.backgroundColor,
        }}
      >
        {comment.authorInfo.avatar ? (
          <AvatarImage
            src={getAvatarSrc(comment.authorInfo)}
            alt={comment.authorInfo.name}
            className="h-7 w-7 object-cover rounded-full"
          />
        ) : (
          <AvatarFallback>{comment.authorInfo.name?.charAt(0).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
    );
  };

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
              {renderAvatar()}
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
