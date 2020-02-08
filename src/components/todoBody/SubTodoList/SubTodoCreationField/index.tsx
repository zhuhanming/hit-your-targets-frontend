import React from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';

import { useTheme } from 'contexts/themeContext';
import { useTodo } from 'contexts/todoContext';

import './SubTodoCreationField.scss';

interface SubTodoCreationFieldProps {
  id: number;
  todoStartTime: string;
  todoEndTime: string;
  isFullyCompleted: boolean;
}

const SubTodoCreationField: React.SFC<SubTodoCreationFieldProps> = ({
  id,
  todoStartTime,
  todoEndTime,
  isFullyCompleted
}) => {
  const { createSubTodo, updateTodo } = useTodo();
  const { theme } = useTheme();

  type FormData = {
    title: string;
  };
  const { register, handleSubmit } = useForm<FormData>({
    reValidateMode: 'onSubmit'
  });

  const onSubmit = async (data, e): Promise<void> => {
    if (data.title.length === 0) {
      toast.info(
        'Type your subtask into the field above and press enter to create it!'
      );
    } else if (data.title.length > 60) {
      toast.error('Your subtask name is too long! Remember, short and sweet!');
    } else {
      const code = {
        ...data,
        startTime: moment(todoStartTime).format(),
        endTime: moment(todoEndTime).format(),
        completed: false
      };
      try {
        await createSubTodo(id, code);
        if (isFullyCompleted) {
          await updateTodo(id, {
            completed: false
          });
        }
        toast.success(`${data.title} created!`);
        e.target.reset();
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="subtodo-field">
      <div className="control">
        <input
          className={`input subtodo-field__input ${theme}`}
          name="title"
          type="text"
          autoComplete="off"
          placeholder="+ Press enter to add a Subtask"
          ref={register}
        />
      </div>
    </form>
  );
};

export default SubTodoCreationField;
