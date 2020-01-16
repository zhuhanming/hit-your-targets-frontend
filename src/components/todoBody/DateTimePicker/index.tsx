import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';

import { useTodo } from 'contexts/todoContext';
import { getLatestDeadline } from 'utils/timeUtils';

import 'react-datepicker/dist/react-datepicker.css';
import '../TodoBody.scss';

const DateTimePicker = ({ todo }) => {
  const { updateTodo } = useTodo();
  const { id, title, startTime, endTime, subtodos } = todo;
  const startTimeDate = new Date(Date.parse(startTime));
  const endTimeDate = new Date(Date.parse(endTime));
  const latestEndTimeDate = subtodos
    ? getLatestDeadline(subtodos)
    : startTimeDate;

  const handleStartTimeChange = date => {
    if (Date.parse(date) === Date.parse(startTime)) return;
    try {
      if (date < startTimeDate) {
        updateTodo(id, { startTime: moment(date).format() });
      } else {
        const newEndTime =
          Date.parse(endTime) + (Date.parse(date) - Date.parse(startTime));
        updateTodo(id, {
          startTime: moment(date).format(),
          endTime: moment(newEndTime).format()
        });
      }
      toast.success(`Nice! ${title} updated!`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEndTimeChange = date => {
    if (date > startTimeDate) {
      if (date > latestEndTimeDate) {
        try {
          updateTodo(id, { endTime: moment(date).format() });
          toast.success(`Nice! ${title} updated!`);
        } catch (error) {
          console.log(error.message);
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
          onChange={date => handleStartTimeChange(date)}
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
          onChange={date => handleEndTimeChange(date)}
        />
      </div>
    </>
  );
};

export default DateTimePicker;
