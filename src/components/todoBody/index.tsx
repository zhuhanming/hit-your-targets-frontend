import React from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useTodo } from 'contexts/todoContext';
import TodoBodyHeader from './TodoBodyHeader';
import DateTimePicker from './DateTimePicker';

import './TodoBody.scss';

const TodoBody = ({ todo, setFocus }) => {
  const { updateTodo } = useTodo();
  // const [isError, setIsError] = useState(false);
  const { id, title, description } = todo;
  const initialState = { title, description };

  const { register, handleSubmit, getValues } = useForm({
    mode: 'onBlur'
  });
  const onSubmit = data => console.log(data);

  const handleTodoBlur = () => {
    try {
      const newState = getValues();
      if (!_.isEqual(newState, initialState)) {
        updateTodo(id, newState);
        toast.success(`Nice! ${title} updated!`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      className="todo-body"
      onSubmit={handleSubmit(onSubmit)}
      key={`form-${id}`}
    >
      <TodoBodyHeader todo={todo} setFocus={setFocus} />
      <input
        className="todo-body__title is-size-4"
        name="title"
        type="text"
        ref={register({ required: true })}
        onBlur={handleTodoBlur}
        autoComplete="off"
        defaultValue={title}
      />
      <DateTimePicker todo={todo} />
      <div className="todo-body__tag">
        <p className="todo-body__tag__label">Tags</p>
        <p className="tag is-primary">Work in Progress!</p>
      </div>
      <textarea
        className="todo-body__description"
        name="description"
        rows={6}
        ref={register}
        onBlur={handleTodoBlur}
        placeholder="Description"
        defaultValue={description}
      />
    </form>
  );
};

export default TodoBody;
