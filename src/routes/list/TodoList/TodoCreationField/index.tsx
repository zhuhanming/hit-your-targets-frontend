/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import moment from 'moment';

import { useTodo } from 'contexts/todoContext';
import { useView } from 'contexts/viewContext';
import { useForm } from 'react-hook-form';
import { View } from 'interfaces/ViewContext';
import { toast } from 'react-toastify';

import './TodoCreationField.scss';

const TodoCreationField = () => {
  const { viewSelected } = useView();
  const { createTodo } = useTodo();
  const { register, handleSubmit, watch, errors } = useForm({
    reValidateMode: 'onSubmit'
  });
  const onSubmit = async (data, e) => {
    if (data.title.length === 0) {
      toast.info(
        'Type your task into the field above and press enter to create it!'
      );
    } else if (data.title.length > 50) {
      toast.error('Your task name is too long! Remember, short and sweet!');
    } else {
      const code = {
        ...data,
        description: '',
        startTime: moment().format(),
        endTime:
          viewSelected === View.NEXT_SEVEN_DAYS
            ? moment()
                .add(7, 'days')
                .endOf('day')
                .format()
            : moment()
                .endOf('day')
                .format(),
        completed: false
      };
      try {
        await createTodo(code);
        toast.success(`${data.title} created!`);
        e.target.reset();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const placeholderText =
    viewSelected === View.NEXT_SEVEN_DAYS
      ? 'Create a task due this week.'
      : 'Create a task due today.';

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
        />
      </div>
    </form>
  );
};

export default TodoCreationField;