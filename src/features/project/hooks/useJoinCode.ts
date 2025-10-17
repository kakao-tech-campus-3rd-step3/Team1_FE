import { useState, useEffect } from 'react';
import { projectMembershipApi } from '@/features/project/api/projectMembershipApi';
import { isAxiosError } from 'axios';

export const useJoinCode = (projectId: string) => {
  const [joinCode, setJoinCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const loadJoinCode = async () => {
      setLoading(true);

      try {
        // 참여 코드 조회
        let codeInfo = await projectMembershipApi
          .fetchJoinCode(projectId)
          .catch((error: unknown) => {
            // 코드 없음 → 생성
            if (isAxiosError(error) && error.response?.status === 404) {
              return projectMembershipApi.createJoinCode(projectId);
            }
            throw error;
          });

        // 만료된 코드면 새로 생성
        if (!codeInfo || new Date(codeInfo.expiresAt) < new Date()) {
          codeInfo = await projectMembershipApi.createJoinCode(projectId);
        }

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
