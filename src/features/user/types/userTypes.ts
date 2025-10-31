export interface User {
  id: string;
  name: string;
  avatar?: AvatarInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface AvatarInfo {
  avatarId: string;
  backgroundColor: string;
}
export interface Member {
  id: string;
  name: string;
  avatar?: AvatarInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
