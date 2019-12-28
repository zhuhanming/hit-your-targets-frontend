const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const getDisplayDate = (endTime: string) => {
  const endTimeDate = new Date(Date.parse(endTime));
  if (isToday(endTimeDate)) {
    return { displayDate: 'Today', warning: true };
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
