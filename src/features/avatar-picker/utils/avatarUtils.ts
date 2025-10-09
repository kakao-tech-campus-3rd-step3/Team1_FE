type AvatarModule = { default: string };

export const getAvatarListUtils = () => {
  const avatarModules = import.meta.glob<AvatarModule>('@/shared/assets/images/avatars/*.png', {
    eager: true,
  });
  return Object.values(avatarModules).map((module) => module.default);
};
export const getRandomAvatarId = (avatarList: string[]) => {
  const randomIndex = Math.floor(Math.random() * avatarList.length);
  return randomIndex;
};
