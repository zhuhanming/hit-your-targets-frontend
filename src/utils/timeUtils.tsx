import moment from 'moment';

const isToday = (date: moment.Moment): boolean => {
  return date.isSame(moment(), 'day');
};

const isTomorrow = (date: moment.Moment): boolean => {
  return date.isSame(moment().add(1, 'days'), 'day');
};

const isThisWeek = (date: moment.Moment): boolean => {
  return (
    date.isAfter(moment()) &&
    date.isSameOrBefore(moment().add(7, 'days'), 'day')
  );
};

const getDisplayDate = (endTime: string): string => {
  const endTimeDate = moment(endTime);
  if (isToday(endTimeDate)) {
    return endTimeDate.format('H:mma');
  }
  if (isTomorrow(endTimeDate)) {
    return 'Tomorrow';
  }
  if (isThisWeek(endTimeDate)) {
    return endTimeDate.format('dddd');
  }

  if (endTimeDate.isBefore(moment())) {
    if (endTimeDate.isSame(moment(), 'year'))
      return endTimeDate.format('D MMM');
    return endTimeDate.format('D MMM YYYY');
  }
  return endTimeDate.format('D MMM');
};

const isWarning = (endTime: string) => {
  const endTimeDate = moment(endTime);
  return endTimeDate.isSameOrBefore(moment(), 'day');
};

const getDaysRemaining = (endTime: string, completed: boolean) => {
  const endTimeDate = moment(endTime);
  if (isToday(endTimeDate)) {
    return 'DUE TODAY';
  }
  if (isTomorrow(endTimeDate)) {
    return 'DUE TOMORROW';
  }
  if (endTimeDate.isBefore(moment())) {
    const numberOfDays = moment().diff(endTimeDate, 'days');
    if (completed) return `${numberOfDays} DAYS AGO`;
    return `${numberOfDays} DAYS OVERDUE`;
  }
  const numberOfDays = endTimeDate.diff(moment(), 'days');
  return `${numberOfDays} DAYS REMAINING`;
};

export { getDisplayDate, isWarning, getDaysRemaining };
