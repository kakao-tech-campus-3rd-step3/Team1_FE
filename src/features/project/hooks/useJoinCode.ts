import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';

export const useJoinCode = (projectId: string) => {
  const [joinCode, setJoinCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const loadJoinCode = async () => {
      setLoading(true);

      try {
        const codeInfo = await projectMembershipApi
          .fetchJoinCode(projectId)
          .catch(async (error: unknown) => {
            if (isAxiosError(error)) {
              if (error.response?.status === 404) {
                return projectMembershipApi.createJoinCode(projectId);
              }
              if (error.response?.status === 400) {
                return projectMembershipApi.createJoinCode(projectId);
              }
            }
            throw error;
          });

        setJoinCode(codeInfo.joinCode);
        setExpiresAt(codeInfo.expiresAt);
      } catch (err) {
        console.error('참여 코드 조회/생성 실패:', err);
        setJoinCode(null);
        setExpiresAt(null);
      } finally {
        setLoading(false);
      }
    };

    loadJoinCode();
  }, [projectId]);

  return { joinCode, expiresAt, loading };
};
