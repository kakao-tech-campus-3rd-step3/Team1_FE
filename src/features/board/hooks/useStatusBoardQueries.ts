import { useAllProjectTasksQueries } from '@/features/task/hooks/useAllProjectTasksQueries';
import { useAllMyTasksQueries } from '@/features/task/hooks/useAllMyTasksQueries';
import { statusList, type ColumnData } from '@/features/board/types/boardTypes';
import { useSortStore } from '@/features/board/store/useSortStore';

export const useStatusBoardQueries = (projectId?: string): ColumnData[] => {
  const isProjectBoard = !!projectId;
  const { sortBy, direction } = useSortStore();

  const projectQueries = useAllProjectTasksQueries(
    projectId ?? '',
    isProjectBoard,
    sortBy,
    direction,
  );

  const myTaskQueries = useAllMyTasksQueries(!isProjectBoard, sortBy, direction);
  const queries = isProjectBoard ? projectQueries : myTaskQueries;

  return statusList.map((status) => ({
    status,
    query: queries[status],
  }));
};
