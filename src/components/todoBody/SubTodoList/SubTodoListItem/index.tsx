/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import autosize from 'autosize';

import { useTodo } from 'contexts/todoContext';

import './SubTodoListItem.scss';

const SubTodoListItem = ({
  subTodo,
  currentKey,
  keyLimit,
  todoId,
  todoStartTime,
  todoEndTime
}) => {
  const { title, completed, endTime, id, startTime } = subTodo;
  const [isChecked, setIsChecked] = useState(completed);
  const { updateSubTodo, deleteSubTodo } = useTodo();
  const { register, getValues, setValue } = useForm({
    mode: 'onBlur'
  });
  const startTimeDate = new Date(Date.parse(startTime));
  const endTimeDate = new Date(Date.parse(endTime));
  const todoStartTimeDate = new Date(Date.parse(todoStartTime));
  const todoEndTimeDate = new Date(Date.parse(todoEndTime));

  const handleSubTodoBlur = () => {
    try {
      const newState = getValues();
      if (newState.title.length === 0) {
        toast.error('You need to have a title for this subtask!');
        setValue('title', title);
        autosize.update(document.querySelectorAll('textarea'));
      } else if (newState.title !== title) {
        updateSubTodo(todoId, id, newState);
        toast.success(`Nice! ${newState.title} updated!`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheck = async () => {
    try {
      setIsChecked(!isChecked);
      await updateSubTodo(todoId, id, {
        completed: !completed
      });
      if (!completed) {
        toast.success(`👍 Great job! ${title} completed!`);
      } else {
        toast.warn('😮 No rush there!');
      }
    } catch (error) {
      // setIsChecked(false);
    }
  };

  const handleStartTimeChange = date => {
    if (Date.parse(date) === Date.parse(startTime)) return;
    try {
      if (date < startTimeDate) {
        updateSubTodo(todoId, id, { startTime: moment(date).format() });
        toast.success(`Nice! ${title} updated!`);
      } else {
        const newEndTime =
          Date.parse(endTime) + (Date.parse(date) - Date.parse(startTime));
        if (newEndTime < Date.parse(todoEndTime)) {
          updateSubTodo(todoId, id, {
            startTime: moment(date).format(),
            endTime: moment(newEndTime).format()
          });
          toast.success(`Nice! ${title} updated!`);
        } else {
          updateSubTodo(todoId, id, {
            startTime: moment(date).format(),
            endTime: moment(todoEndTime).format()
          });
          toast.success(`Nice! ${title} updated!`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEndTimeChange = date => {
    if (date > startTimeDate && date <= todoEndTimeDate)
      try {
        updateSubTodo(todoId, id, { endTime: moment(date).format() });
        toast.success(`Nice! ${title} updated!`);
      } catch (error) {
        console.log(error.message);
      }
    else
      toast.error(
        "Watch out! Your end time is either before the start time or after the parent task's end time!"
      );
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this subtask? You cannot undo this action.'
    );
    if (confirmDelete) {
      try {
        deleteSubTodo(todoId, id);
        toast.success(`${title} has been deleted!`);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <li
      className={`subtodo-list-item ${
        currentKey < keyLimit ? 'has-bottom-border' : ''
      } `}
    >
      <div className="subtodo-list-item__first-row">
        <input
          type="checkbox"
          className="is-checkradio is-success subtodo-list-item__content__checkbox"
          id={`subtodo-${id}`}
          name={`subtodo-${id}`}
          checked={isChecked}
          onChange={handleCheck}
          // eslint-disable-next-line no-param-reassign
        />
        <label
          className="subtodo-list-item__checkbox tooltip-container"
          htmlFor={`subtodo-${id}`}
        />
        <div className="subtodo-list-item__content">
          <textarea
            className="subtodo-list-item__title__textarea"
            name="title"
            ref={register({ required: true })}
            onBlur={handleSubTodoBlur}
            autoComplete="off"
            defaultValue={title}
            rows={1}
          />
          <div className="subtodo-list-item__second-row">
            <div className="subtodo-list-item__time">
              <span>Start: </span>
              <DatePicker
                id={`subTodoStartTime-${id}`}
                selected={startTimeDate}
                name={`subTodoStartTime-${id}`}
                className="subtodo-list-item__time__picker"
                minDate={todoStartTimeDate}
                maxDate={todoEndTimeDate}
                timeFormat="HH:mm"
                showTimeSelect
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="d MMM yy, HH:mm aa"
                onChange={date => handleStartTimeChange(date)}
              />
              <span>End: </span>

              <DatePicker
                id={`subTodoEndTime-${id}`}
                selected={endTimeDate}
                name={`subTodoEndTime-${id}`}
                className="subtodo-list-item__time__picker"
                timeFormat="HH:mm"
                showTimeSelect
                minDate={startTimeDate}
                maxDate={todoEndTimeDate}
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="d MMM yy, HH:mm aa"
                onChange={date => handleEndTimeChange(date)}
              />
            </div>
            <div className="subtodo-list-item__delete">
              <button
                type="button"
                className="as-non-button subtodo-list-item__delete__button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SubTodoListItem;
