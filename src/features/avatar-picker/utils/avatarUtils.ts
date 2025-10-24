type AvatarModule = { default: string };

const avatarModules = import.meta.glob<AvatarModule>('@/shared/assets/images/avatars/*.png', {
  eager: true,
});

export const avatarList = Object.values(avatarModules).map((m) => m.default);

export const getAvatarListUtils = () => avatarList;

export const getRandomAvatarId = () => {
  const randomIndex = Math.floor(Math.random() * avatarList.length);
  return randomIndex;
};
export const getAvatarById = (avatarId: string | number) => {
  const targetFileName = `${Number(avatarId)}.png`;
  for (const [path, module] of Object.entries(avatarModules)) {
    if (path.endsWith(targetFileName)) return module.default;
  }
  return undefined;
};
