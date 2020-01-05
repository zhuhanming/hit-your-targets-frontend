import React, { useEffect } from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import autosize from 'autosize';

import { useTodo } from 'contexts/todoContext';
import { useTheme } from 'contexts/themeContext';
import TodoBodyHeader from './TodoBodyHeader';
import DateTimePicker from './DateTimePicker';
import SubTodoList from './SubTodoList';
import TagsInputField from './TagsInputField';

import './TodoBody.scss';

const TodoBody = ({ todo, setFocus, isMobile = false }) => {
  const { updateTodo } = useTodo();
  const { theme } = useTheme();
  // const [isError, setIsError] = useState(false);
  const { id, title, description } = todo;
  const initialState = { title, description };
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  });

  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: 'onBlur'
  });
  const onSubmit = data => console.log(data);

  const handleTodoBlur = () => {
    try {
      const newState = getValues();
      if (newState.title.length === 0) {
        toast.error('Your task title cannot be empty!');
        setValue('title', title, true);
        autosize.update(document.querySelectorAll('textarea'));
      } else if (newState.title.length > 80) {
        toast.error('Your task name is too long! Remember, short and sweet!');
        setValue('title', title, true);
        autosize.update(document.querySelectorAll('textarea'));
      } else if (!_.isEqual(newState, initialState)) {
        updateTodo(id, newState);
        toast.success(`Nice! ${newState.title} updated!`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="todo-body__container">
      {isMobile && (
        <button
          type="button"
          className="as-non-button todo-body__back"
          onClick={() => setFocus(null)}
        >
          &larr;&nbsp;&nbsp;&nbsp;Back to List
        </button>
      )}
      <form
        className="todo-body"
        onSubmit={handleSubmit(onSubmit)}
        key={`form-${id}`}
      >
        <TodoBodyHeader todo={todo} setFocus={setFocus} isMobile={isMobile} />
        <textarea
          className="todo-body__title is-size-4"
          name="title"
          // type="text"
          ref={register({ required: true })}
          onBlur={handleTodoBlur}
          autoComplete="off"
          defaultValue={title}
          rows={1}
        />
        <DateTimePicker todo={todo} />
        <div className="todo-body__tag">
          <p className="todo-body__tag__label">Tags</p>
          {/* <p className="tag is-primary">Work in Progress!</p> */}
          <TagsInputField todo={todo} />
        </div>
        <textarea
          className={`todo-body__description ${theme}`}
          name="description"
          rows={1}
          ref={register}
          onBlur={handleTodoBlur}
          placeholder="Description"
          defaultValue={description}
        />
      </form>
      <SubTodoList todo={todo} setFocus={setFocus} isMobile={isMobile} />
    </div>
  );
};

export default TodoBody;
