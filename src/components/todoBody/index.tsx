import React, { useEffect } from 'react';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import autosize from 'autosize';
import * as Sentry from '@sentry/react';

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
  isKanban?: boolean;
}

// The default view of a todo
// It contains the inputs for title and description
// Concept is to make the inputs easily editable
const TodoBody: React.SFC<TodoBodyProps> = ({
  todo,
  setFocus,
  isMobile = false,
  isKanban = false,
}) => {
  const { updateTodo } = useTodo();
  const { theme } = useTheme();
  // const [isError, setIsError] = useState(false);
  const { id, title, description } = todo;

  // Create input forms
  type FormData = {
    title: string;
    description: string;
  };
  const initialState: FormData = { title, description };
  const { getValues, setValue, control } = useForm<FormData>({
    mode: 'onBlur',
  });

  // To resize the fields containing the title and description
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, [todo]);

  // Handle change in title or description
  // Occurs when clicking away from title or description
  const handleTodoBlur = async (): Promise<void> => {
    try {
      const newState = getValues();
      if (newState.title.length === 0) {
        // If title is empty - return
        // Description is allowed to be empty
        toast.error('Your task title cannot be empty!');
        setValue('title', title, true);
      } else if (newState.title.length > 80) {
        // Title is too long - return
        toast.error('Your task name is too long! Remember, short and sweet!');
        setValue('title', title, true);
      } else if (!_.isEqual(newState, initialState)) {
        // Changes have been made to the values - update
        await updateTodo(id, newState);
        toast.success(`Nice! ${newState.title} updated!`);
      }
      autosize.update(document.querySelectorAll('textarea'));
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <div
      className={`todo-body__container ${
        isKanban && !isMobile ? 'todo-body__container--kanban' : ''
      }`}
      key={`todo-body-${id}`}
    >
      {isMobile && (
        <button
          type="button"
          className="as-non-button todo-body__back"
          onClick={(): void => setFocus(null)}
        >
          &larr;&nbsp;&nbsp;&nbsp;Back to {isKanban ? 'Kanban' : 'List'}
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
