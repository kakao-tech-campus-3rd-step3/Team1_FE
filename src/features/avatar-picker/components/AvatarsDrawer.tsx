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

const avatarBgColors = Object.values(AVATAR_BG_COLOR);
interface AvatarsDrawerProps {
  showEditButton?: boolean;
  showConfirmButton?: boolean;
}

const AvatarsDrawer = ({ showEditButton=true, showConfirmButton }: AvatarsDrawerProps) => {
  const { mutate: updateAvatar } = useUpdateAvatarMutation();

  const {
    selectedAvatarId,
    selectedBgColor,
    setAvatarId,
    setBgColor,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  } = useAvatarStore();
  const handleConfirm = () => {
    if (!selectedAvatarId || !selectedBgColor) {
      toast.error('아바타와 배경색을 모두 선택해주세요!');
      return;
    }

    updateAvatar(
      { avatar: selectedAvatarId, backgroundColor: selectedBgColor },
      {
        onSuccess: () => {
          toast.success('아바타가 변경되었습니다!');
          closeDrawer();
        },
        onError: () => {
          toast.error('아바타 변경에 실패했습니다.');
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
            className="absolute -bottom-2 -right-2 bg-boost-blue hover:bg-boost-blue-hover text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-boost-blue/30"
            aria-label="아바타 변경"
          >
            <Pen size={20} />
            <span className="absolute inset-0 bg-white rounded-full opacity-20 pointer-events-none" />
          </button>
        </DrawerTrigger>
      )}

      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="pt-8 pb-4 text-center border-b border-gray-100">
          <DrawerTitle className="text-3xl font-bold text-gray-800 mb-2">아바타 선택</DrawerTitle>
          <DrawerDescription className="text-gray-600 text-lg">
            아바타와 배경색상을 골라보세요!{' '}
          </DrawerDescription>
        </DrawerHeader>

        {/* 배경색 그리드 */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex justify-center gap-3 flex-wrap max-w-md mx-auto">
            {avatarBgColors.map(({ token, hex }) => (
              <button
                key={hex}
                onClick={() => setBgColor(hex)}
                className={cn(
                  'relative w-12 h-12 rounded-full transition-all duration-200 hover:scale-110',
                  selectedBgColor === hex
                    ? 'ring-4 ring-boost-blue ring-offset-2 scale-110'
                    : 'ring-2 ring-gray-200 hover:ring-gray-300',
                )}
                style={{ backgroundColor: token }}
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
        <div className="px-6 py-6 max-h-96 overflow-y-auto">
          <div role="listbox" aria-label="아바타 목록" className="grid grid-cols-3 gap-6">
            {avatarList.map((avatarUrl, index) => {
              const isSelected = selectedAvatarId === String(index);
              return (
                <div key={index} className="flex justify-center">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    className="group relative cursor-pointer outline-none"
                    onClick={() => setAvatarId(String(index))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setAvatarId(String(index));
                      }
                    }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-boost-blue to-purple-500 rounded-full blur-md opacity-30 scale-110" />
                    )}

                    <Avatar
                      className={cn(
                        'w-28 h-28 border-4 transition-all duration-300 relative',
                        isSelected
                          ? 'border-boost-blue shadow-lg scale-105'
                          : 'border-gray-200 group-hover:border-boost-blue group-hover:shadow-md group-hover:scale-105',
                      )}
                      style={{
                        backgroundColor: isSelected ? selectedBgColor || '#f3f4f6' : '#f3f4f6',
                      }}
                    >
                      <AvatarImage src={avatarUrl} alt={`Avatar ${index + 1}`} />
                      <AvatarFallback
                        style={{
                          backgroundColor: selectedBgColor || '#f3f4f6',
                        }}
                      >
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
        {showConfirmButton && (selectedAvatarId || selectedBgColor) && (
          <div className="flex justify-end px-6 py-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-boost-blue hover:bg-boost-blue-hover text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              확인
            </button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AvatarsDrawer;
