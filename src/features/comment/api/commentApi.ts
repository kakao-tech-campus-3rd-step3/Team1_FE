import api from '@/shared/api/axiosInstance';
import type { CommentType, FileInfo } from '@/features/comment/types/commentTypes';
export interface CreateCommentRequest {
  content: string;
  persona: 'BOO' | 'USER';
  isAnonymous: boolean;
  fileInfo?: FileInfo;
}
export const commentApi = {
  // 댓글 목록 조회
  fetchComments: async (projectId: string, taskId: string): Promise<CommentType[]> => {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}/comments`);
    return data;
  },

  // 댓글 생성
  createComment: async (projectId: string, taskId: string, commentData: CreateCommentRequest) => {
    const { data } = await api.post<CommentType>(
      `/projects/${projectId}/tasks/${taskId}/comments`,
      commentData,
    );
    return data;
  },

  // 댓글 수정
  updateComment: async (
    commentId: string,
    updatedData: Partial<CommentType>,
  ): Promise<CommentType> => {
    const { data } = await api.put(`/comments/${commentId}`, updatedData);
    return data;
  },

  // 댓글 삭제
  deleteComment: async (commentId: string): Promise<{ success: boolean }> => {
    await api.delete(`/comments/${commentId}`);
    return { success: true };
  },
};
