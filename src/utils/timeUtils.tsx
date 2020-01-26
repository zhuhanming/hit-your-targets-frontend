import moment from 'moment';
import SubToDo from 'interfaces/SubToDo';

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

const getDaysRemaining = (endTime: string, completed: boolean): string => {
  const endTimeDate = moment(endTime);
  if (isToday(endTimeDate)) {
    return 'DUE TODAY';
  }
  if (isTomorrow(endTimeDate)) {
    return 'DUE TOMORROW';
  }
  if (endTimeDate.isBefore(moment())) {
    const numberOfDays =
      moment().diff(endTimeDate, 'days') === 0
        ? 1
        : moment().diff(endTimeDate, 'days');

    if (completed)
      return `${numberOfDays} ${numberOfDays === 1 ? 'DAY' : 'DAYS'} AGO`;
    return `${numberOfDays} ${numberOfDays === 1 ? 'DAY' : 'DAYS'} OVERDUE`;
  }
  const numberOfDays = endTimeDate.diff(moment(), 'days');
  return `${numberOfDays} ${numberOfDays === 1 ? 'DAY' : 'DAYS'} REMAINING`;
};

const getLatestDeadline = (subtodos: SubToDo[]): Date => {
  return new Date(
    subtodos.reduce((a, b) => {
      return new Date(a.endTime) > new Date(b.endTime) ? a : b;
    }).endTime
  );
};

export { getDisplayDate, isWarning, getDaysRemaining, getLatestDeadline };
