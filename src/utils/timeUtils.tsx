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
  return date < nextWeek;
};

const getDisplayDate = (endTime: string) => {
  const endTimeDate = new Date(Date.parse(endTime));
  if (isToday(endTimeDate)) {
    return { displayDate: 'Today', warning: true };
  }
  if (isTomorrow(endTimeDate)) {
    return { displayDate: 'Tomorrow', warning: false };
  }
  if (isThisWeek(endTimeDate)) {
    const week = endTimeDate.toLocaleString('default', { weekday: 'long' });
    return { displayDate: `${week}`, warning: false };
  }
  const now = new Date();
  const day = endTimeDate.getDate();
  const month = endTimeDate.toLocaleString('default', { month: 'short' });

  if (endTimeDate < now) {
    if (now.getFullYear() === endTimeDate.getFullYear())
      return { displayDate: `${day} ${month}`, warning: true };
    return {
      displayDate: `${day} ${month} ${endTimeDate.getFullYear()}`,
      warning: true
    };
  }
  return { displayDate: `${day} ${month}`, warning: false };
};

export { getDisplayDate };
