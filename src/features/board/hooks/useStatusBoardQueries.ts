import { useAllProjectTasksQueries } from '@/features/task/hooks/useAllProjectTasksQueries';
import { useAllMyTasksQueries } from '@/features/task/hooks/useAllMyTasksQueries';
import { statusList, type ColumnData } from '@/features/board/types/boardTypes';

export const useStatusBoardQueries = (projectId?: string): ColumnData[] => {
  const isProjectBoard = !!projectId;

  const projectQueries = useAllProjectTasksQueries(projectId ?? '', isProjectBoard);
  const myTaskQueries = useAllMyTasksQueries(!isProjectBoard);

  const queries = isProjectBoard ? projectQueries : myTaskQueries;

  return statusList.map((status) => ({
    status,
    query: queries[status],
  }));
};
