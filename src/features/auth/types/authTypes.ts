export interface KakaoLoginRequest {
  code: string;
  redirectUri: string;
}

export interface KakaoLoginResponse {
  accessToken: string;
}

export interface RefreshTokenResponse {
  newAccessToken: string;
}