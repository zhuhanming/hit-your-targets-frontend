import React from 'react';
import { toast } from 'react-toastify';
import TagsInput from 'react-tagsinput';
// import 'react-tagsinput/react-tagsinput.css';
import * as Sentry from '@sentry/react';

import { useTodo } from 'contexts/todoContext';
import { useTheme } from 'contexts/themeContext';
import { capitalize } from 'utils/index';
import ToDo from 'interfaces/ToDo';

import './TagsInputField.scss';

interface TagsInputFieldProps {
  todo: ToDo;
}

// Custom tags input field to show entered tags on left
const TagsInputField: React.FunctionComponent<TagsInputFieldProps> = ({
  todo,
}) => {
  const { updateTodo } = useTodo();
  const { theme } = useTheme();
  const { id, tags } = todo;
  const { length } = tags;

  // Update list of tags of the task
  const handleChange = async (updatedTags: string[]): Promise<void> => {
    // Max number of tags is 5 - if exceed, return
    if (length >= 5 && updatedTags.length >= length) {
      toast.info('You can only have up to 5 tags for every task!');
    } else {
      // Check if there are repeated tags
      const newTags = [...new Set(updatedTags.map(capitalize))];
      if (newTags.length < updatedTags.length) {
        toast.warn('That tag has already been added!');
      } else {
        const code = { tags: newTags };
        try {
          await updateTodo(id, code);
          toast.success('Tags updated!');
        } catch (error) {
          Sentry.captureException(error);
        }
      }
    }
  };

  return (
    <TagsInput
      value={tags}
      onChange={handleChange}
      tagProps={{
        className: 'tag is-primary react-tagsinput-tag',
        classNameRemove: 'react-tagsinput-remove',
      }}
      inputProps={{
        className: `react-tagsinput-input ${theme} ${
          length === 5 ? 'hide' : ''
        }`,
        placeholder: 'Add a tag',
      }}
    />
  );
};

export default TagsInputField;
