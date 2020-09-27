/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import moment from 'moment';
import * as Sentry from '@sentry/react';

import { useTodo } from 'contexts/todoContext';
import { useView } from 'contexts/viewContext';
import { useTheme } from 'contexts/themeContext';
import { useForm } from 'react-hook-form';
import { View } from 'interfaces/ViewContext';
import { toast } from 'react-toastify';

import './TodoCreationField.scss';

interface TodoCreationField {
  isKanban?: boolean;
  cancelCallback?: () => void;
}

// Input field to instantly creat a todo
const TodoCreationField: React.SFC<TodoCreationField> = ({
  isKanban = false,
  cancelCallback = (): void => {
    Sentry.captureMessage(
      'Missing cancelCallback function in TodoCreationField!'
    );
  },
}) => {
  const { viewSelected, updateView } = useView();
  const { createTodo } = useTodo();
  const { register, handleSubmit } = useForm({
    reValidateMode: 'onSubmit',
  });
  const { theme } = useTheme();
  const onSubmit = async (data, e): Promise<void> => {
    if (data.title.length === 0) {
      // No title entered - return
      toast.info(
        'Type your task into the field above and press enter to create it!'
      );
    } else if (data.title.length > 80) {
      // Title too long - return
      toast.error('Your task name is too long! Remember, short and sweet!');
    } else {
      // Valid input
      const code = {
        ...data,
        description: '',
        startTime: moment().format(),
        endTime:
          viewSelected === View.NEXT_SEVEN_DAYS
            ? moment().add(7, 'days').endOf('day').format()
            : moment().endOf('day').format(),
        completed: false,
        tags: [],
      };
      try {
        e.target.reset();
        await createTodo(code);
        toast.success(`${data.title} created!`);
        if (viewSelected === View.COMPLETED) {
          updateView(View.TODAY);
        }
        if (isKanban) {
          cancelCallback();
        }
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  };

  // eslint-disable-next-line no-nested-ternary
  const placeholderText = isKanban
    ? 'Create a task due today.'
    : viewSelected === View.NEXT_SEVEN_DAYS
    ? 'Press enter to create a task due this week.'
    : 'Press enter to create a task due today.';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="todo-field">
      <div className="control">
        <input
          className="input todo-field__input"
          name="title"
          type="text"
          autoComplete="off"
          placeholder={placeholderText}
          ref={register}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={isKanban}
        />
      </div>
      {isKanban && (
        <div className="field todo-field__buttons">
          <button type="submit" className={`button is-submit ${theme}`}>
            Submit
          </button>
          <button
            type="button"
            className="button is-cancel is-light has-text-dark"
            onClick={cancelCallback}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default TodoCreationField;
