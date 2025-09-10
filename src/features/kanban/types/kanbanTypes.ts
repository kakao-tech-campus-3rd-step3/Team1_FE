export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  title: string;
  tags: string[];
  assignees: string[];
  description: string;
  dueDate: string;
  comments: number;
  files: number;
};
