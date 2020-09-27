import SubToDo from 'interfaces/SubToDo';

// Returns the progress as a integer out of 100, rounded up
const getProgress = (subtodos: SubToDo[]): number => {
  if (!Array.isArray(subtodos) || subtodos.length === 0) return 0;
  const totalSubtodos = subtodos.length;
  const completedSubtodos = subtodos.filter((subtodo) => subtodo.completed)
    .length;
  return Math.ceil((completedSubtodos / totalSubtodos) * 100);
};

export { getProgress };
