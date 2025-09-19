import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { User } from 'lucide-react';
interface CurrentAvatarProps {
  selectedAvatar: string;
}
const CurrentAvatar = ({ selectedAvatar }: CurrentAvatarProps) => {
  return (
    <div className="relative bg-white rounded-full p-2 shadow-2xl">
      <Avatar className="w-60 h-60 p-3 border-4 bg-boost-orange border-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"/>
        <AvatarImage src={selectedAvatar} alt="Current avatar" />
        <AvatarFallback className="bg-gray-200">
          <User size={52} className="text-gray-500" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default CurrentAvatar;
