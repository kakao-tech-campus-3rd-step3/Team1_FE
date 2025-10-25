import Profile from '@/shared/assets/images/avatars/78.png';
import type { PageSize } from '@/features/task-detail/types/pdfTypes';
import type { FileInfo } from '@/features/comment/types/commentTypes';
import { motion } from 'framer-motion';
interface OverlayProps {
  pins: FileInfo[];
  currentPin: FileInfo | null;
  pageNumber: number;
  zoom: number;
  pageSize: PageSize;
  onClick: (e: React.MouseEvent) => void;
}

const Overlay = ({ pins, currentPin, pageNumber, zoom, pageSize, onClick }: OverlayProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10" onClick={onClick}>
      {pins
        .filter((m: FileInfo) => m.filePage === pageNumber)
        .map((m) => {
          const left = (m.fileX ? m.fileX / pageSize.width : 0) * 100;
          const top = (m.fileY ? m.fileY / pageSize.height : 0) * 100;

          return (
            <div
              key={m.fileId}
              className="bg-boost-orange absolute w-7 h-7 rounded-[50%_50%_50%_0] -rotate-45 border-2 border-boost-orange shadow-md overflow-hidden cursor-pointer"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(-50%, -50%) scale(${zoom})`,
              }}
            >
              <img
                src={Profile}
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
            <motion.div
              layout
              transition={{
                layout: { duration: 0.25, ease: 'easeInOut' },
              }}
              className="absolute w-8 h-8 rounded-[50%_50%_50%_0] -rotate-45 border-2 border-boost-orange shadow-md overflow-hidden cursor-pointer bg-boost-orange opacity-80"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(-50%, -50%) scale(${zoom})`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
            >
              <img
                src={Profile}
                alt="current pin"
                className="w-full h-full object-cover rotate-[45deg]"
              />
            </motion.div>
          );
        })()}
    </div>
  );
};

export default Overlay;
