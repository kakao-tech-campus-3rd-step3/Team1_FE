// 웹 푸시 세션 생성
export interface CreatePushSessionResponse {
  token: string;
  status: 'CREATED' | 'CONNECTED' | 'EXPIRED';
}

// 세션 상태 조회
export interface GetPushSessionStatusResponse {
  token: string;
  //TODO : 어떤 status 가 있는지 확인 필요!
  status: 'CREATED' | 'CONNECTED' | 'EXPIRED' | 'NOT_FOUND';
}

// 웹푸시 세션 연결 (디바이스 연결)
export interface ConnectPushSessionRequest {
  token: string;
  deviceInfo: string;
}
export interface ConnectPushSessionResponse {
  status: 'CONNECTED' | 'FAILED';
}

// 웹푸시 구독 등록
export interface PushSubscriptionRequest {
  token: string;
  webPushUrl: string;
  publicKey: string;
  authKey: string;
}
// TODO: API 확인 필요
export interface PushSubscriptionResponse {
  success: boolean;
  message?: string;
}
