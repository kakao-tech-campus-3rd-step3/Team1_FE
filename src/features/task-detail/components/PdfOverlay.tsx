import Profile from '@/shared/assets/images/avatars/78.png';
import type { Marker, PageSize } from '@/features/task-detail/types/pdfTypes';

interface OverlayProps {
  markers: Marker[];
  pageNumber: number;
  zoom: number;
  pageSize: PageSize;
  onClick: (e: React.MouseEvent) => void;
}

const Overlay = ({ markers, pageNumber, zoom, pageSize, onClick }: OverlayProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10" onClick={onClick}>
      {markers
        .filter((m: Marker) => m.page === pageNumber)
        .map((m) => {
          const left = (m.x / pageSize.width) * 100;
          const top = 100 - (m.y / pageSize.height) * 100;

          return (
            <div
              key={m.id}
              className="bg-boost-orange absolute w-6 h-6 rounded-[50%_50%_50%_0] -rotate-45 border-2 border-boost-orange shadow-md overflow-hidden cursor-pointer"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: `translate(50%, -120%) scale(${zoom})`,
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
    </div>
  );
};

export default Overlay;
