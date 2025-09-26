export const calculateDDay = (dueDate?: string | null) => {
  if (!dueDate) return null;
  else
    return String(Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
};
