//TODO: type에 따라서 알림 아이콘을 설정해줄 수 있도록 해야해요!
//아직 알림 관련 얘기를 나눠보지 않아서 아래처럼 해놓음!!

import { Bell, CheckCircle, Heart, MessageSquareShare, UserPlus } from 'lucide-react';

export const mockAlarms = [
  {
    id: 1,
    type: 'approve',
    title: '승인 완료',
    description: '김혜민님이 승인하셨습니다.',
    time: '5분 전',
    read: false,
    icon: MessageSquareShare,
  },
  {
    id: 2,
    type: 'follow',
    title: '새로운 댓글',
    description: '서영진님이 내 할일에 댓글을 남겼어요.',
    time: '1시간 전',
    read: true,
    icon: UserPlus,
  },
  {
    id: 3,
    type: 'reminder',
    title: '할일 마감 임박',
    description: '김원호님이 설정한 할일이 30분 후 마감됩니다.',
    time: '30분 전',
    read: false,
    icon: Bell,
  },
  {
    id: 4,
    type: 'complete',
    title: '할일 완료',
    description: '이진호님이 할일을 완료했습니다.',
    time: '2시간 전',
    read: true,
    icon: CheckCircle,
  },
  {
    id: 5,
    type: 'like',
    title: '할일 좋아요',
    description: '김혜민님이 당신의 할일을 좋아합니다.',
    time: '10분 전',
    read: false,
    icon: Heart,
  },
  {
    id: 6,
    type: 'approve',
    title: '승인 요청',
    description: '서영진님이 승인을 요청했습니다.',
    time: '3시간 전',
    read: false,
    icon: MessageSquareShare,
  },
  {
    id: 7,
    type: 'follow',
    title: '새로운 팔로우',
    description: '김원호님이 당신을 팔로우하기 시작했습니다.',
    time: '1일 전',
    read: true,
    icon: UserPlus,
  },
];
