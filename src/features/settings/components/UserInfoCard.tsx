import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Button } from '@/shared/components/shadcn/button';
import { Input } from '@/shared/components/shadcn/input';
import { getAvatarSrc } from '@/features/avatar-picker/utils/avatarUtils';
import { useUpdateNameMutation } from '@/features/settings/hooks/useUpdateNameMutation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import { useAvatarStore } from '@/features/avatar-picker/store/useAvatarStore';

interface UserInfoProps {
  name: string;
  avatar: string;
  backgroundColor: string;
}

interface UserInfoComponentProps {
  member: UserInfoProps;
}

export const UserInfoCard = ({ member }: UserInfoComponentProps) => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [newName, setNewName] = useState(member.name);
  const { mutate: updateName, isPending } = useUpdateNameMutation();
  const { openDrawer } = useAvatarStore();
  const handleNameSave = () => {
    if (!newName.trim()) {
      toast.error('이름을 입력해주세요.');
      return;
    }

    updateName(newName, {
      onSuccess: () => {
        toast.success('이름이 변경되었습니다!');
        setIsNameEditing(false);
      },
      onError: () => {
        toast.error('이름 변경에 실패했습니다.');
      },
    });
  };

  const handleNameCancel = () => {
    setNewName(member.name);
    setIsNameEditing(false);
  };

  return (
    <SettingsSectionCard title="내 정보">
      <div className="flex items-center gap-4">
        <Avatar style={{ backgroundColor: member.backgroundColor }} className="w-20 h-20">
          <AvatarImage src={getAvatarSrc(member)} alt="user avatar" />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {isNameEditing ? (
          <div className="flex items-center gap-2">
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-40" />
            <Button size="sm" onClick={handleNameSave} disabled={isPending}>
              {isPending ? '저장 중...' : '저장'}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleNameCancel}>
              취소
            </Button>
          </div>
        ) : (
          <p className="text-base font-medium text-gray-800">{member.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">내 정보 수정</label>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setIsNameEditing(true)}
            disabled={isNameEditing}
          >
            이름 변경
          </Button>

          <Button onClick={openDrawer} variant="secondary">
            아바타 변경
          </Button>
        </div>
      </div>
    </SettingsSectionCard>
  );
};
