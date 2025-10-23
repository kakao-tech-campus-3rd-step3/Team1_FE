import type {
  MemberTaskListResponse,
  TaskDetail,
  TaskListItem,
  TaskListResponse,
} from '@/features/task/types/taskTypes';
import type { CreateTaskInput } from '@/features/task/schemas/taskSchema';
import api from '@/shared/api/axiosInstance';

export const taskApi = {
  // 나의 할 일 목록 조회 (상태 기준)
  fetchMyTasksByStatus: async (
    cursor?: string,
    status?: string,
    limit = 10,
  ): Promise<TaskListResponse> => {
    const res = await api.get<TaskListResponse>(`/me/tasks`, { params: { cursor, limit, status } });
    return res.data;
  },

  // 프로젝트 할 일 목록 조회 (상태 기준)
  fetchProjectTasksByStatus: async (
    projectId: string,
    cursor?: string,
    status?: string,
    limit = 10,
  ): Promise<TaskListResponse> => {
    const res = await api.get<TaskListResponse>(`/projects/${projectId}/tasks`, {
      params: { cursor, limit, status },
    });
    return res.data;
  },

  // 프로젝트 할 일 목록 조회 (멤버 기준)
  fetchProjectTasksByMember: async (
    projectId: string,
    memberId: string,
    cursor?: string,
    limit = 10,
  ): Promise<MemberTaskListResponse> => {
    const res = await api.get<MemberTaskListResponse>(
      `/projects/${projectId}/members/${memberId}/tasks`,
      { params: { cursor, limit } },
    );
    return res.data;
  },

  // 할 일 상세 조회
  fetchTaskDetail: async (projectId: string, taskId: string): Promise<TaskDetail> => {
    const res = await api.get<TaskDetail>(`/projects/${projectId}/tasks/${taskId}`);
    return res.data;
  },

  // 할 일 생성
  createTask: async (projectId: string, taskData: CreateTaskInput): Promise<TaskListItem> => {
    const res = await api.post<TaskListItem>(`/projects/${projectId}/tasks`, taskData);
    return res.data;
  },

  // 할 일 삭제
  deleteTask: async (projectId: string, taskId: string): Promise<{ success: boolean }> => {
    const res = await api.delete<{ success: boolean }>(`/projects/${projectId}/tasks/${taskId}`);
    return res.data;
  },

  // 할 일 이동
  moveTask: async (
    projectId: string,
    taskId: string,
    status: string,
  ): Promise<{ id: string; status: string }> => {
    const res = await api.patch<{ id: string; status: string }>(
      `/projects/${projectId}/tasks/${taskId}`,
      { status },
    );
    return res.data;
  },
};
