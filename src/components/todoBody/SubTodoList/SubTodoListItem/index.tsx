/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import autosize from 'autosize';
import * as Sentry from '@sentry/browser';

import { useTodo } from 'contexts/todoContext';
import Modal from 'components/modal';
import ConfirmationModalBody from 'components/confirmationModalBody';
import SubToDo from 'interfaces/SubToDo';

import './SubTodoListItem.scss';

interface SubTodoListItemProps {
  subTodo: SubToDo;
  currentKey: number;
  keyLimit: number;
  todoId: number;
  todoStartTime: string;
  todoEndTime: string;
  todoTitle: string;
  isFullyCompleted: boolean;
  isOneAwayFromCompletion: boolean;
  setFocus: (id: number | null) => void;
  isMobile: boolean;
}

// Subtodo List Item for TodoBody view
// Concept is to allow direct editing from this item
const SubTodoListItem: React.FC<SubTodoListItemProps> = ({
  subTodo,
  currentKey,
  keyLimit,
  todoId,
  todoStartTime,
  todoEndTime,
  todoTitle,
  isFullyCompleted,
  isOneAwayFromCompletion,
  setFocus,
  isMobile
}) => {
  const { title, completed, endTime, id, startTime } = subTodo;
  const [isChecked, setIsChecked] = useState(completed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateSubTodo, deleteSubTodo, updateTodo } = useTodo();

  // Initialise input form
  const { register, getValues, setValue } = useForm({
    mode: 'onBlur'
  });

  // Preprocessing of variables to help logic later
  const startTimeDate = new Date(Date.parse(startTime));
  const endTimeDate = new Date(Date.parse(endTime));
  const todoStartTimeDate = new Date(Date.parse(todoStartTime));
  const todoEndTimeDate = new Date(Date.parse(todoEndTime));

  // Save changes to subtodo title when clicked away
  const handleSubTodoBlur = async (): Promise<void> => {
    try {
      const newState = getValues();
      if (newState.title.length === 0) {
        // Missing title - return
        toast.error('You need to have a title for this subtask!');
        setValue('title', title);
        autosize.update(document.querySelectorAll('textarea'));
      } else if (newState.title.length > 60) {
        // Title too long - return
        toast.error(
          'Your subtask name is too long! Remember, short and sweet!'
        );
      } else if (newState.title !== title) {
        await updateSubTodo(todoId, id, newState);
        toast.success(`Nice! ${newState.title} updated!`);
        autosize.update(document.querySelectorAll('textarea'));
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  // Handle changing of subtodo completion status
  const handleCheck = async (): Promise<void> => {
    try {
      await updateSubTodo(todoId, id, {
        completed: !completed
      });
      // If the subtodo is the last one left OR todo was originally completed
      if (isOneAwayFromCompletion || isFullyCompleted) {
        // Todo will have to change its status
        // If last subtodo left is completed, then todo is now completed
        // If todo was originally complete, the subtodo now incomplete makes it incomplete as well
        await updateTodo(todoId, {
          completed: !completed
        });
      }
      if (!completed) {
        toast.success(
          `👍 Great job! ${title} completed${
            isOneAwayFromCompletion ? ` and ${todoTitle} is fully done` : ''
          }!`
        );
      } else if (isFullyCompleted) {
        // If the todo is now incomplete
        toast.warn(`Oh dear! What happened? Task is now incomplete.`);
      } else {
        toast.warn('😅 No rush there!');
      }
      setIsChecked(!isChecked);
      if (
        ((isOneAwayFromCompletion && !completed) ||
          (isFullyCompleted && completed)) &&
        !isMobile
      ) {
        // Dismiss the active TodoBody once todo completion status changes
        setFocus(null);
      }
    } catch (error) {
      // setIsChecked(completed);
      Sentry.captureException(error);
    }
  };

  // Check if changes to start time are valid before changing
  const handleStartTimeChange = async (date: string): Promise<void> => {
    // No change - return
    if (Date.parse(date) === Date.parse(startTime)) return;
    try {
      if (new Date(Date.parse(date)) < startTimeDate) {
        // Shifting start time earlier - no issues
        await updateSubTodo(todoId, id, { startTime: moment(date).format() });
        toast.success(`Nice! ${title} updated!`);
      } else if (Date.parse(date) > Date.parse(todoEndTime)) {
        // Shifting start time later than main task end time
        // Should not be possible due to DatePicker configurations
        toast.error('Your subtask cannot start after the main task ends!');
      } else {
        // Shifting start time later - need to shift end time back by same amount
        const newEndTime =
          Date.parse(endTime) + (Date.parse(date) - Date.parse(startTime));
        if (newEndTime < Date.parse(todoEndTime)) {
          // If end time is within main todo's endtime - safely set end time to new end time
          await updateSubTodo(todoId, id, {
            startTime: moment(date).format(),
            endTime: moment(newEndTime).format()
          });
          toast.success(`Nice! ${title} updated!`);
        } else {
          // Else set the task end time as the subtodo end time
          await updateSubTodo(todoId, id, {
            startTime: moment(date).format(),
            endTime: moment(todoEndTime).format()
          });
          toast.success(`Nice! ${title} updated!`);
        }
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  // Check if changes to end time are valid before changing
  const handleEndTimeChange = async (date: string): Promise<void> => {
    // No change - return
    if (Date.parse(date) === Date.parse(endTime)) return;
    const newDate = new Date(Date.parse(date));
    // Check if new end time is before its start tiem and before parent task end time
    if (newDate > startTimeDate && newDate <= todoEndTimeDate)
      try {
        await updateSubTodo(todoId, id, { endTime: moment(date).format() });
        toast.success(`Nice! ${title} updated!`);
      } catch (error) {
        Sentry.captureException(error);
      }
    else
      toast.error(
        "Watch out! Your end time is either before the start time or after the parent task's end time!"
      );
  };

  // Handle deletion of subtask
  const handleDelete = async (): Promise<void> => {
    try {
      await deleteSubTodo(todoId, id);
      setIsModalOpen(false);
      toast.success(`${title} has been deleted!`);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleClose={(): void => setIsModalOpen(false)}
      >
        <ConfirmationModalBody
          message="Are you sure you want to delete this subtask? You cannot undo this action."
          handleConfirm={handleDelete}
          handleCancel={(): void => setIsModalOpen(false)}
          confirmButtonClassName="is-danger"
          cancelButtonClassName="is-light"
          confirmButtonText="Delete"
        />
      </Modal>
      <li
        className={`subtodo-list-item ${
          currentKey < keyLimit ? 'has-bottom-border' : ''
        } ${
          (isOneAwayFromCompletion && !completed) || isFullyCompleted
            ? 'tooltip is-tooltip-top'
            : ''
        }`}
        data-tooltip={`${
          isFullyCompleted
            ? 'Unchecking this will mark this task incomplete!'
            : 'Completing this will complete the task!'
        }`}
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
                <div>
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
                    onChange={(date: string): Promise<void> =>
                      handleStartTimeChange(date)
                    }
                  />
                </div>
                <div>
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
                    onChange={(date: string): Promise<void> =>
                      handleEndTimeChange(date)
                    }
                  />
                </div>
              </div>
              <div className="subtodo-list-item__delete">
                <button
                  type="button"
                  className="as-non-button subtodo-list-item__delete__button"
                  onClick={(): void => setIsModalOpen(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default SubTodoListItem;
