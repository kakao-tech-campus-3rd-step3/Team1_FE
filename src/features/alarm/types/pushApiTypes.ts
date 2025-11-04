export const WebPushStatus = {
  CREATED: 'CREATED',
  CONNECTED: 'CONNECTED',
  REGISTERED: 'REGISTERED',
} as const;

export type WebPushStatusType = (typeof WebPushStatus)[keyof typeof WebPushStatus];

// 웹 푸시 세션 생성
export interface CreatePushSessionResponse {
  token: string;
  status: WebPushStatusType;
}

// 세션 상태 조회
export interface GetPushSessionStatusResponse {
  token: string;
  status: WebPushStatusType;
}

// 웹푸시 세션 연결 (디바이스 연결)
export interface ConnectPushSessionRequest {
  token: string;
  deviceInfo: string;
}
// 웹푸시 세션 연결 응답
export interface ConnectPushSessionResponse {
  status: WebPushStatusType;
}

// 웹푸시 구독 등록
export interface PushSubscriptionRequest {
  token: string;
  webPushUrl: string;
  publicKey: string;
  authKey: string;
}
// 웹푸시 구독 등록 응답
export interface PushSubscriptionResponse {
  token: string;
  status: WebPushStatusType;
}
