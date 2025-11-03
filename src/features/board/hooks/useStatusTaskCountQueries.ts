import { useMyTaskCountByStatusQuery } from '@/features/task/hooks/useMyTaskCountByStatus';
import { useProjectTaskCountByStatusQuery } from '@/features/task/hooks/useProjectTaskCountByStatusQuery';

export const useStatusTaskCountQueries = (projectId?: string) => {
  const isProjectBoard = !!projectId;

  const projectTaskCountQuery = useProjectTaskCountByStatusQuery(projectId ?? '');
  const myTaskCountQuery = useMyTaskCountByStatusQuery(!isProjectBoard);

  return isProjectBoard ? projectTaskCountQuery : myTaskCountQuery;
};
