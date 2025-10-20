import type { Member } from '@/shared/data/mockMembers';

export interface KakaoLoginRequest {
  code: string;
  redirectUri: string;
}

export interface KakaoLoginResponse {
  accessToken: string;
  memberResponseDto: Member;
  isNewUser: boolean;
}

export interface RefreshTokenResponse {
  newAccessToken: string;
}
