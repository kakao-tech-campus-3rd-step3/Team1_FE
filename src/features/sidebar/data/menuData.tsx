import type { SidebarItem } from '../types/menuTypes';
import { Settings, User, Layers, Bell } from 'lucide-react';

//TODO: 추후 프로젝트 목록은 api로 받아올 예정
export const sub_items = [
  { title: '팀플 A', url: '/project/123' },
  { title: '팀플 B', url: '/project/124' },
  { title: '팀플 C', url: '/project/125' },
];

export const items: SidebarItem[] = [
  { title: '나의 할 일', url: '/my-task', icon: <User size={16} /> },
  { title: '프로젝트', icon: <Layers size={16} />, subItems: sub_items },
  { title: '알림', url: '/alarm', icon: <Bell size={16} /> },
  { title: '설정', url: '/settings', icon: <Settings size={16} /> },
];
