import type { PageSize } from '@/features/task-detail/types/pdfTypes';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { PinWithAuthor } from '@/features/task-detail/types/taskDetailType';
import { useTaskDetailStore } from '@/features/task-detail/store/useTaskDetailStore';
interface OverlayProps {
  pageNumber: number;
  zoom: number;
  pageSize: PageSize;
  onClick: (e: React.MouseEvent) => void;
}

const Overlay = ({ pageNumber, zoom, pageSize, onClick }: OverlayProps) => {
  const { pins, currentPin, selectedFile } = useTaskDetailStore();
  const pinList = pins as PinWithAuthor[];
  const { user } = useAuthStore();
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10" onClick={onClick}>
      {pinList
        .filter((m) => m.fileId === selectedFile?.fileId && m.filePage === pageNumber)
        .map((m) => {
          const left = (m.fileX ? m.fileX / pageSize.width : 0) * 100;
          const top = 100 - (m.fileY ? m.fileY / pageSize.height : 0) * 100;

          return (
            <div
              key={m.fileId}
              className="bg-boost-orange absolute w-7 h-7 rounded-[50%_50%_50%_0] -rotate-45 border-2 border-white shadow-md overflow-hidden cursor-pointer"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(50%, -120%) scale(${zoom})`,
              }}
            >
              <img
                src={getAvatarSrc({ avatar: m.author?.avatar })}
                alt="profile"
                className="w-full h-full object-cover -rotate-[-45deg]"
              />
            </div>
          );
        })}
      {currentPin &&
        currentPin.filePage === pageNumber &&
        (() => {
          const left = (currentPin.fileX ? currentPin.fileX / pageSize.width : 0) * 100;
          const top = 100 - (currentPin.fileY ? currentPin.fileY / pageSize.height : 0) * 100;
          return (
            <div
              className="absolute w-8 h-8 rounded-[50%_50%_50%_0] -rotate-45 border-2 border-boost-orange shadow-md overflow-hidden cursor-pointer bg-boost-orange  transition-all duration-300 ease-in-out"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(50%, -120%) scale(${zoom})`,
              }}
            >
              <img
                src={getAvatarSrc({ avatar: user?.avatar })}
                alt="current pin"
                style={{ backgroundColor: user?.backgroundColor }}
                className="w-full h-full object-cover rotate-[45deg]"
              />
            </div>
          );
        })()}
    </div>
  );
};

export default Overlay;
