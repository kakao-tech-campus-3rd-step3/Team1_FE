import type { SidebarItem } from '@/features/sidebar/types/menuTypes';
import { Settings, User, Layers, Bell } from 'lucide-react';

export const items: SidebarItem[] = [
  { title: '나의 할 일', url: '/my-task', icon: <User size={16} /> },
  { title: '프로젝트', icon: <Layers size={16} /> },
  { title: '알림', icon: <Bell size={16} /> },
  { title: '설정', url: '/settings', icon: <Settings size={16} /> },
];
