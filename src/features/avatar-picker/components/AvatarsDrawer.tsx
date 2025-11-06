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
import { cn } from '@/shared/lib/utils';
import { AVATAR_BG_COLOR } from '@/features/avatar-picker/constants/avatarBgColor';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';
import { avatarList } from '@/features/avatar-picker/utils/avatarUtils';
import toast from 'react-hot-toast';
import { useUpdateAvatarMutation } from '@/features/settings/hooks/useUpdateAvatarMutation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import tinycolor from 'tinycolor2';
import { Button } from '@/shared/components/shadcn/button';

const avatarBgColors = Object.values(AVATAR_BG_COLOR);

interface AvatarsDrawerProps {
  showEditButton?: boolean;
  showConfirmButton?: boolean;
}

const AvatarsDrawer = ({ showEditButton = true, showConfirmButton }: AvatarsDrawerProps) => {
  const { mutate: updateAvatar } = useUpdateAvatarMutation();
  const { user } = useAuthStore();

  const {
    selectedAvatarId,
    selectedBgColor,
    setAvatarId,
    setBgColor,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  } = useAvatarStore();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isDrawerOpen && user) {
      setAvatarId(user.avatar ?? '');
      setBgColor(user.backgroundColor ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen, user?.avatar, user?.backgroundColor]);

  const handleConfirm = () => {
    if (!selectedAvatarId || !selectedBgColor) {
      toast.error('아바타와 배경색을 모두 선택해주세요!');
      return;
    }

    updateAvatar(
      { avatar: selectedAvatarId, backgroundColor: selectedBgColor },
      {
        onSuccess: () => {
          closeDrawer();
        },
      },
    );
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={(open) => (open ? openDrawer() : closeDrawer())}>
      {showEditButton && (
        <DrawerTrigger asChild>
          <button
            type="button"
            className="absolute -bottom-2 -right-2 bg-boost-blue hover:bg-boost-blue-hover text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-boost-blue/30 cursor-pointer"
            aria-label="아바타 변경"
          >
            <Pen size={20} />
            <span className="absolute inset-0 bg-white rounded-full opacity-20 pointer-events-none" />
          </button>
        </DrawerTrigger>
      )}

      <DrawerContent className="max-h-[95vh] border-gray-300">
        <DrawerHeader className="pt-8 pb-4 text-center border-b border-gray-100">
          <DrawerTitle className="text-3xl font-bold text-gray-800 mb-2">아바타 선택</DrawerTitle>
          <DrawerDescription className="text-gray-600 text-lg">
            아바타와 배경색상을 골라보세요!
          </DrawerDescription>
        </DrawerHeader>

        {/* 배경색 그리드 */}
        <div className="flex items-center px-6 py-6 border-b border-gray-100 mb-5">
          <div className="flex justify-center gap-5 flex-wrap mx-auto">
            {avatarBgColors.map(({ token, hex }) => (
              <button
                key={hex}
                onClick={() => setBgColor(hex)}
                className={cn(
                  'relative w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 focus:scale-120 hover:shadow-sm cursor-pointer',
                )}
                style={{
                  backgroundColor: token,
                }}
                aria-label={`색상 ${hex}`}
              >
                {selectedBgColor === hex && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1 shadow-lg">
                      <Check className="text-gray-800 w-4 h-4" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 아바타 그리드 */}
        <div className="px-24 py-6 max-h-96 overflow-y-auto">
          <div role="listbox" aria-label="아바타 목록" className="grid grid-cols-4 gap-6">
            {avatarList.map((avatarUrl, index) => {
              const isSelected = selectedAvatarId === String(index);
              const isHovered = hoveredIndex === index;

              return (
                <div key={index} className="flex justify-center">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    className="group relative cursor-pointer outline-none"
                    onClick={() => setAvatarId(String(index))}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {isSelected && (
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-50 scale-110 transition-all"
                        style={{
                          background: `radial-gradient(circle, ${selectedBgColor} 0%, transparent 30%)`,
                        }}
                      />
                    )}

                    <Avatar
                      className={cn(
                        'w-30 h-30 border-4 transition-all p-1 duration-300 relative flex items-center justify-center',
                        isSelected
                          ? 'shadow-lg scale-105'
                          : 'border-gray-200 group-hover:shadow-md group-hover:scale-105',
                      )}
                      style={{
                        backgroundColor:
                          isSelected || isHovered ? selectedBgColor || '#f3f4f6' : '#ffffff',
                        borderColor: isSelected
                          ? tinycolor(selectedBgColor || '#f3f4f6')
                              .darken(3)
                              .toString()
                          : '#ffffff',
                      }}
                    >
                      <AvatarImage
                        src={avatarUrl}
                        alt={`Avatar ${index + 1}`}
                        className="w-24 h-24"
                      />
                      <AvatarFallback
                        style={{
                          backgroundColor: selectedBgColor || '#f3f4f6',
                        }}
                      >
                        <User size={24} />
                      </AvatarFallback>
                    </Avatar>

                    {isSelected && (
                      <div className="absolute top-1 -right-0 bg-boost-blue rounded-full p-1.5 shadow-lg">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {showConfirmButton && selectedAvatarId && selectedBgColor && (
          <div className="absolute top-2 left-0 right-2 flex justify-end px-6 py-4 bg-transparent">
            <Button
              variant="defaultBoost"
              onClick={handleConfirm}
              className="rounded-full w-12 h-12 shadow-md"
            >
              <Check className="w-9 h-9" />
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AvatarsDrawer;
