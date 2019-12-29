const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isTomorrow = (date: Date) => {
  const today = new Date();
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

const isThisWeek = (date: Date) => {
  const today = new Date();
  const nextWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 6
  );
  return today < date && date < nextWeek;
};

const getDisplayDate = (endTime: string) => {
  const endTimeDate = new Date(Date.parse(endTime));
  if (isToday(endTimeDate)) {
    return 'Today';
  }
  if (isTomorrow(endTimeDate)) {
    return 'Tomorrow';
  }
  if (isThisWeek(endTimeDate)) {
    const weekday = endTimeDate.toLocaleString('default', { weekday: 'long' });
    return `${weekday}`;
  }
  const now = new Date();
  const day = endTimeDate.getDate();
  const month = endTimeDate.toLocaleString('default', { month: 'short' });

  if (endTimeDate < now) {
    if (now.getFullYear() === endTimeDate.getFullYear())
      return `${day} ${month}`;
    return `${day} ${month} ${endTimeDate.getFullYear()}`;
  }
  return `${day} ${month}`;
};

const isWarning = (endTime: string) => {
  const endTimeDate = new Date(Date.parse(endTime));
  if (isToday(endTimeDate)) {
    return true;
  }
  return endTimeDate < new Date();
};

const getDaysRemaining = (endTime: string, completed: boolean) => {
  const endTimeDate = new Date(Date.parse(endTime));
  if (isToday(endTimeDate)) {
    return 'DUE TODAY';
  }
  if (isTomorrow(endTimeDate)) {
    return 'DUE TOMORROW';
  }
  const now = new Date();
  if (endTimeDate < now) {
    const numberOfDays = Math.ceil(
      (now.getTime() - endTimeDate.getTime()) / (1000 * 3600 * 24)
    );
    if (completed) return `${numberOfDays} DAYS AGO`;
    return `${numberOfDays} DAYS OVERDUE`;
  }
  const numberOfDays = Math.ceil(
    (endTimeDate.getTime() - now.getTime()) / (1000 * 3600 * 24)
  );
  return `${numberOfDays} DAYS REMAINING`;
};

export { getDisplayDate, isWarning, getDaysRemaining };
