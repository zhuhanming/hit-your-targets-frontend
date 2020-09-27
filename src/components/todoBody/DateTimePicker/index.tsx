import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import * as Sentry from '@sentry/react';

import { useTodo } from 'contexts/todoContext';
import { getLatestDeadline } from 'utils/timeUtils';
import ToDo from 'interfaces/ToDo';

import 'react-datepicker/dist/react-datepicker.css';
import '../TodoBody.scss';

interface DateTimePickerProps {
  todo: ToDo;
}

// Date Time options for Todos - shown in TodoBody view
const DateTimePicker: React.FunctionComponent<DateTimePickerProps> = ({
  todo,
}) => {
  const { updateTodo } = useTodo();
  const { id, title, startTime, endTime, subtodos } = todo;
  const startTimeDate = new Date(Date.parse(startTime));
  const endTimeDate = new Date(Date.parse(endTime));
  const latestEndTimeDate =
    subtodos.length > 0 ? getLatestDeadline(subtodos) : startTimeDate;

  // Check if change to start time is valid before changing
  const handleStartTimeChange = async (date: string): Promise<void> => {
    // No change - return
    if (Date.parse(date) === Date.parse(startTime)) return;
    try {
      // If shifting start time earlier - no issues
      if (new Date(Date.parse(date)) < startTimeDate) {
        await updateTodo(id, { startTime: moment(date).format() });
      } else {
        // If shifting start time later - shift end time by same amount
        const newEndTime =
          Date.parse(endTime) + (Date.parse(date) - Date.parse(startTime));
        await updateTodo(id, {
          startTime: moment(date).format(),
          endTime: moment(newEndTime).format(),
        });
      }
      toast.success(`Nice! ${title} updated!`);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  // Check if change to end time is valid before changing
  const handleEndTimeChange = async (date: string): Promise<void> => {
    // No change - return
    if (Date.parse(date) === Date.parse(endTime)) return;
    const newDate = new Date(Date.parse(date));
    // Check if new end time is still before the start time
    if (newDate > startTimeDate) {
      // Check if new end time is not after latest subtask end time
      if (newDate > latestEndTimeDate) {
        try {
          await updateTodo(id, { endTime: moment(date).format() });
          toast.success(`Nice! ${title} updated!`);
        } catch (error) {
          Sentry.captureException(error);
        }
      } else toast.error('Your task cannot end before your subtasks end!');
    } else toast.error('Woah! End time must be after start time!');
  };

  return (
    <>
      <div className="todo-body__time">
        <label htmlFor="startTime" className="todo-body__time__label">
          Start
        </label>
        <DatePicker
          id="startTime"
          selected={startTimeDate}
          name="startTime"
          className="is-size-6 todo-body__time__picker"
          timeFormat="HH:mm"
          showTimeSelect
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy HH:mm aa"
          onChange={(date: string): Promise<void> =>
            handleStartTimeChange(date)
          }
        />
      </div>
      <div className="todo-body__time">
        <label htmlFor="startTime" className="todo-body__time__label">
          End
        </label>
        <DatePicker
          id="endTime"
          selected={endTimeDate}
          name="endTime"
          className="is-size-6 todo-body__time__picker"
          timeFormat="HH:mm"
          showTimeSelect
          timeIntervals={15}
          timeCaption="Time"
          minDate={startTimeDate}
          dateFormat="MMMM d, yyyy HH:mm aa"
          onChange={(date: string): Promise<void> => handleEndTimeChange(date)}
        />
      </div>
    </>
  );
};

export default DateTimePicker;
