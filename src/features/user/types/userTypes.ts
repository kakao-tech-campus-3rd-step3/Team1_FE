export interface User {
  id: string;
  name: string;
  avatar?: string;
  backgroundColor?: string;
  notificationEnabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isAnonymous?: boolean;
}

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  backgroundColor?: string;
  notificationEnabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AvatarInfo {
  avatar: string;
  backgroundColor: string;
}
