import React, { useEffect } from 'react';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import autosize from 'autosize';
import * as Sentry from '@sentry/browser';

import { useTodo } from 'contexts/todoContext';
import { useTheme } from 'contexts/themeContext';
import ToDo from 'interfaces/ToDo';
import TodoBodyHeader from './TodoBodyHeader';
import DateTimePicker from './DateTimePicker';
import SubTodoList from './SubTodoList';
import TagsInputField from './TagsInputField';

import './TodoBody.scss';

interface TodoBodyProps {
  todo: ToDo;
  setFocus: (id: number | null) => void;
  isMobile?: boolean;
}

const TodoBody: React.SFC<TodoBodyProps> = ({
  todo,
  setFocus,
  isMobile = false
}) => {
  const { updateTodo } = useTodo();
  const { theme } = useTheme();
  // const [isError, setIsError] = useState(false);
  const { id, title, description } = todo;

  type FormData = {
    title: string;
    description: string;
  };
  const initialState: FormData = { title, description };
  const { getValues, setValue, control } = useForm<FormData>({
    mode: 'onBlur'
  });

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, []);

  const handleTodoBlur = (): void => {
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
      Sentry.captureException(error);
    }
  };

  return (
    <div className="todo-body__container" key={`todo-body-${id}`}>
      {isMobile && (
        <button
          type="button"
          className="as-non-button todo-body__back"
          onClick={(): void => setFocus(null)}
        >
          &larr;&nbsp;&nbsp;&nbsp;Back to List
        </button>
      )}
      <form className="todo-body" key={`form-${id}`}>
        <TodoBodyHeader todo={todo} setFocus={setFocus} isMobile={isMobile} />
        <Controller
          as="textarea"
          control={control}
          rules={{ required: true }}
          name="title"
          onBlur={handleTodoBlur}
          defaultValue={title}
          rows={1}
          className="todo-body__title is-size-4"
          autoComplete="off"
        />
        <DateTimePicker todo={todo} />
        <div className="todo-body__tag">
          <p className="todo-body__tag__label">Tags</p>
          {/* <p className="tag is-primary">Work in Progress!</p> */}
          <TagsInputField todo={todo} />
        </div>
        <Controller
          as="textarea"
          control={control}
          name="description"
          onBlur={handleTodoBlur}
          defaultValue={description}
          rows={1}
          className={`todo-body__description ${theme}`}
          placeholder="Description"
        />
      </form>
      <SubTodoList todo={todo} setFocus={setFocus} isMobile={isMobile} />
    </div>
  );
};

export default TodoBody;
