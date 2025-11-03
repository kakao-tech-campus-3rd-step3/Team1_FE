import { useMyTaskCountByStatusQuery } from '@/features/task/hooks/useMyTaskCountByStatus';
import { useProjectTaskCountByStatusQuery } from '@/features/task/hooks/useProjectTaskCountByStatusQuery';
import { useBoardSearchStore } from '@/features/board/store/useBoardSearchStore';
import { BOARD_KEYS } from '@/features/board/constants/boardConstants';

export const useStatusTaskCountQueries = (projectId?: string) => {
  const isProjectBoard = !!projectId;
  const searchMap = useBoardSearchStore((state) => state.searchMap);

  const search = isProjectBoard
    ? searchMap[BOARD_KEYS.PROJECT_STATUS]
    : searchMap[BOARD_KEYS.MY_TASKS];

  const projectTaskCountQuery = useProjectTaskCountByStatusQuery(projectId ?? '', true, search);
  const myTaskCountQuery = useMyTaskCountByStatusQuery(!isProjectBoard, search);

  return isProjectBoard ? projectTaskCountQuery : myTaskCountQuery;
};
