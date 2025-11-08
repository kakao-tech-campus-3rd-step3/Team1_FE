import type { PageSize } from '@/features/task-detail/types/pdfTypes';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
import { User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/shared/lib/utils';

interface OverlayProps {
  pageNumber: number;
  zoom: number;
  pageSize: PageSize;
  onClick: (e: React.MouseEvent) => void;
}

const Overlay = ({ pageNumber, zoom, pageSize, onClick }: OverlayProps) => {
  const { pins, currentPin, selectedFile, setSelectedCommentId } = useTaskDetailStore();
  const pinList = pins as PinWithAuthor[];
  const { user } = useAuthStore();

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10" onClick={onClick}>
      {pinList
        .filter((m) => m.fileId === selectedFile?.fileId && m.filePage === pageNumber)
        .map((m) => {
          const left = (m.fileX ? m.fileX / pageSize.width : 0) * 100;
          const top = 100 - (m.fileY ? m.fileY / pageSize.height : 0) * 100;
          const isAnonymous = m.isAnonymous;

          return (
            <div
              key={uuidv4()}
              onClick={(e) => {
                e.stopPropagation();
                if (m.commentId) setSelectedCommentId(m.commentId);
              }}
              className={cn(
                'flex items-center justify-center absolute w-7 h-7 rounded-[50%_50%_50%_0] -rotate-45 border-2 shadow-md overflow-hidden cursor-pointer select-none transition-all duration-200',
                isAnonymous ? 'bg-gray-500 border-gray-500' : '',
              )}
              style={{
                backgroundColor: !isAnonymous ? m.author?.backgroundColor : undefined,
                borderColor: !isAnonymous ? m.author?.backgroundColor : undefined,
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(50%, -120%) scale(${zoom})`,
              }}
            >
              {isAnonymous ? (
                <User className="text-white w-3.5 h-3.5 rotate-[45deg]" />
              ) : (
                <img
                  src={getAvatarSrc({ avatar: m.author?.avatar })}
                  style={{ backgroundColor: m.author?.backgroundColor }}
                  alt={m.author?.name ?? 'avatar'}
                  className="w-6 h-6 object-cover rotate-[45deg]"
                />
              )}
            </div>
          );
        })}
      {currentPin &&
        currentPin.filePage === pageNumber &&
        (() => {
          const left = (currentPin.fileX ? currentPin.fileX / pageSize.width : 0) * 100;
          const top = 100 - (currentPin.fileY ? currentPin.fileY / pageSize.height : 0) * 100;
          const isAnonymous = user?.isAnonymous;
          return (
            <div
              className={cn(
                'absolute flex items-center justify-center w-8 h-8 rounded-[50%_50%_50%_0] -rotate-45 border-2 shadow-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ',
                isAnonymous ? 'bg-gray-500 border-gray-500' : '',
              )}
              style={{
                backgroundColor: !isAnonymous ? user?.backgroundColor : undefined,
                borderColor: !isAnonymous ? user?.backgroundColor : undefined,
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(50%, -120%) scale(${zoom})`,
              }}
            >
              {isAnonymous ? (
                <User className="text-white w-4 h-4 rotate-[45deg]" />
              ) : (
                <img
                  src={getAvatarSrc({ avatar: user?.avatar })}
                  alt="current pin"
                  className="w-6 h-6 object-cover rotate-[45deg]"
                  style={{ backgroundColor: user?.backgroundColor }}
                />
              )}
            </div>
          );
        })()}
    </div>
  );
};

export default Overlay;
