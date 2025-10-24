export const COMMENT_QUERY_KEYS = {
  root: ['comments'] as const,

  list: (projectId: string, taskId: string) =>
    [...COMMENT_QUERY_KEYS.root, projectId, taskId] as const,
};
