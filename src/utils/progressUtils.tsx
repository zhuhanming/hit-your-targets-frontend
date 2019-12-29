const getProgress = (subtodos): number => {
  if (!Array.isArray(subtodos) || subtodos.length === 0) return 0;
  const totalSubtodos = subtodos.length;
  const completedSubtodos = subtodos.filter(subtodo => subtodo.completed)
    .length;
  return Math.ceil((completedSubtodos / totalSubtodos) * 100);
};

export { getProgress };
