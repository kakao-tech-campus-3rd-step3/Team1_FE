import CurrentAvatar from '@/features/avatar-picker/components/CurrentAvatar';
import AvatarsDrawer from '@/features/avatar-picker/components/AvatarsDrawer';
interface AvatarSelectorProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  avatarList: string[];
  selectedAvatar: string;
  handleAvatarSelect: (avatarUrl: string) => void;
}
const AvatarSelector = ({
  isDrawerOpen,
  selectedAvatar,
  setIsDrawerOpen,
  avatarList,
  handleAvatarSelect,
}: AvatarSelectorProps) => {
  return (
    <div className="flex flex-col items-center space-y-6 pt-10">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-boost-orange via-boost-blue to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300 scale-110"/>
        <CurrentAvatar selectedAvatar={selectedAvatar} />
        <AvatarsDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          avatarList={avatarList}
          selectedAvatar={selectedAvatar}
          handleAvatarSelect={handleAvatarSelect}
        />
      </div>
    </div>
  );
};

export default AvatarSelector;
