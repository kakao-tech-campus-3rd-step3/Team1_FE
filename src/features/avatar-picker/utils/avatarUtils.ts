type AvatarModule = { default: string };

export const getAvatarListUtils = () => {
  const avatarModules = import.meta.glob<AvatarModule>('@/shared/assets/images/avatars/*.svg', {
    eager: true,
  });
  return Object.values(avatarModules).map((module) => module.default);
};
export const getRandomAvatar = (avatarList: string[]): string => {
  const randomIndex = Math.floor(Math.random() * avatarList.length);
  return avatarList[randomIndex];
};
