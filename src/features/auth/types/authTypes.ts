import type { User } from '@/features/user/types/userTypes';

export interface KakaoLoginRequest {
  code: string;
  redirectUri: string;
}

export interface KakaoLoginResponse {
  accessToken: string;
  memberResponseDto: User;
  isNewUser: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
