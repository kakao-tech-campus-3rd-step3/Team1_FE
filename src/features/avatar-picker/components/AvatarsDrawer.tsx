import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/shadcn/drawer';
import { Check, Pen, User } from 'lucide-react';
import { avatarList } from '../utils/avatarUtils';
import { cn } from '@/shared/lib/utils';

interface AvatarsDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedAvatar: string;
  handleAvatarSelect: (id: string) => void;
}

const AvatarsDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedAvatar,
  handleAvatarSelect,
}: AvatarsDrawerProps) => {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="absolute -bottom-2 -right-2 bg-boost-blue hover:bg-boost-blue-hover text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-boost-blue/30"
          aria-label="아바타 변경"
        >
          <Pen size={20} />
          <span className="absolute inset-0 bg-white rounded-full opacity-20 pointer-events-none" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="pt-8 pb-4 text-center border-b border-gray-100">
          <DrawerTitle className="text-3xl font-bold text-gray-800 mb-2">아바타 선택</DrawerTitle>
          <DrawerDescription className="text-gray-600 text-lg">
            마음에 드는 아바타를 선택해주세요 🎨
          </DrawerDescription>
        </DrawerHeader>

        {/* Avatar Grid */}
        <div className="px-6 py-6 max-h-96 overflow-y-auto">
          <div role="listbox" aria-label="아바타 목록" className="grid grid-cols-3 gap-6">
            {avatarList.map((avatarUrl, index) => {
              const isSelected = selectedAvatar === String(index);
              return (
                <div key={index} className="mt-4 flex justify-center">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    className="group relative cursor-pointer outline-none"
                    onClick={() => handleAvatarSelect(String(index))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleAvatarSelect(String(index));
                      }
                    }}
                  >
                    {/* 선택된 아바타 배경 글로우 */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-boost-blue to-purple-500 rounded-full blur-md opacity-30 scale-110" />
                    )}

                    <Avatar
                      className={cn(
                        'w-28 h-28 border-2 transition-all duration-300 relative',
                        isSelected
                          ? 'border-boost-blue shadow-lg scale-105'
                          : 'border-gray-200 group-hover:border-boost-blue group-hover:shadow-md group-hover:scale-105',
                      )}
                    >
                      <AvatarImage src={avatarUrl} alt={`Avatar ${index + 1}`} />
                      <AvatarFallback>
                        <User size={24} />
                      </AvatarFallback>
                    </Avatar>

                    {isSelected && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-boost-blue to-blue-600 rounded-full p-1.5 shadow-lg animate-pulse">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AvatarsDrawer;
