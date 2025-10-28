export interface MyInfoResponse {
  id: string;
  name: string;
  avatar: string;
  email: string;
  createdAt: string;
}

export interface UpdateMyInfoRequest {
  name?: string;
  avatarId?: number;
}
 