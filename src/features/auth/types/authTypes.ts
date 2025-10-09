export interface KakaoLoginRequest {
  code: string;
}

export interface KakaoLoginResponse {
  accessToken: string;
}

export interface RefreshTokenResponse {
  newAccessToken: string;
}
