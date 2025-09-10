export interface KakaoLoginRequest {
  code: string;
}

export interface KakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
}
