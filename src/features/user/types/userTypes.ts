export interface User {
  id: string;
  name: string;
  avatar?: string;
  backgroundColor?:string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface AvatarInfo {
  avatar: string;
  backgroundColor: string;
}
export interface Member {
  id: string;
  name: string;
  avatar?: string;
  backgroundColor?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
