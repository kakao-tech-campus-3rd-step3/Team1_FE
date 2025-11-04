export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// 알림 목록 조회 응답
export interface NotificationsResponse {
  notifications: NotificationItem[];
  count: number;
  nextCursor: string | null;
  hasNext: boolean;
}

// 알림 읽음 처리 응답
export interface MarkNotificationAsReadResponse {
  notificationId: string;
  read: boolean;
}
