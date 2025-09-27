import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Pin } from 'lucide-react';
import { User } from 'lucide-react';
import type { Comment } from '@/features/task-detail/types/commentTypes';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex py-3">
      <div className="flex-1">
        <div className="bg-gray-200 rounded-xl px-4 py-3 shadow-sm relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pb-3">
              <Avatar
                className={`h-8 w-8 shrink-0 shadow-xs text-white text-xs ${
                  comment.author === '익명' ? 'bg-gray-400' : 'bg-boost-orange'
                }`}
              >
                {comment.avatar ? (
                  <AvatarImage
                    src={comment.avatar}
                    alt={comment.author}
                    className="h-7 w-7 object-cover rounded-full mx-auto my-auto"
                  />
                ) : comment.author === '익명' ? (
                  <AvatarFallback className="bg-gray-400 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback>{comment.fallback ?? comment.author[0]}</AvatarFallback>
                )}
              </Avatar>
              <span className="label1-bold text-sm">{comment.author}</span>
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
