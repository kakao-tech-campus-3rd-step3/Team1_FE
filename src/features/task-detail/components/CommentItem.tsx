import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Pin, User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { CommentUIType } from '@/features/comment/types/commentTypes';

interface CommentItemProps {
  comment: CommentUIType;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const isAnonymous = comment.isAnonymous; 

  return (
    <div className="flex py-3">
      <div className="flex-1">
        <div className="bg-gray-200 rounded-xl px-4 py-3 shadow-sm relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pb-3">
              <Avatar
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
                    src={comment.authorInfo.avatar}
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

              {comment.isPinned && <Pin className="h-3.5 w-3.5 text-boost-blue" />}
            </div>

            <span className="text-xs text-gray-500">{comment.timeAgo}</span>
          </div>

          <p className="mt-1 text-sm text-gray-800">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
