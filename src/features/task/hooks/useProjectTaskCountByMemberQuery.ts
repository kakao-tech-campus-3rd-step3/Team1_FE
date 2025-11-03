import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/features/task/api/taskApi';
import type {
  ProjectTaskCountByMemberMap,
  ProjectTaskCountByMemberResponse,
} from '@/features/task/types/taskTypes';
import { TASK_QUERY_KEYS } from '@/features/task/constants/taskQueryKeys';

export const useProjectTaskCountByMemberQuery = (projectId?: string) => {
  return useQuery<Record<string, ProjectTaskCountByMemberMap>, Error>({
    queryKey: TASK_QUERY_KEYS.projectCountMember(projectId ?? ''),
    queryFn: async () => {
      const res: ProjectTaskCountByMemberResponse[] = await taskApi.fetchProjectTaskCountByMember(
        projectId ?? '',
      );
      const map: Record<string, ProjectTaskCountByMemberMap> = {};
      res.forEach((item) => {
        map[item.memberId] = {
          todo: item.todo,
          progress: item.progress,
          review: item.review,
        };
      });
      return map;
    },
    enabled: !!projectId,
  });
};
