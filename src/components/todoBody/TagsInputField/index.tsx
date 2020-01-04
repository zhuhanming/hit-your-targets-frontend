import React from 'react';
import { toast } from 'react-toastify';
import TagsInput from 'react-tagsinput';
// import 'react-tagsinput/react-tagsinput.css';

import { useTodo } from 'contexts/todoContext';
import { capitalize } from 'utils/index';

import './TagsInputField.scss';

const TagsInputField = ({ todo }) => {
  const { updateTodo } = useTodo();
  const { id, tags } = todo;
  const { length } = tags;

  const handleChange = updatedTags => {
    if (length >= 5 && updatedTags.length >= length) {
      toast.info('You can only have up to 5 tags for every task!');
    } else {
      const code = { tags: updatedTags.map(tag => capitalize(tag)) };
      try {
        updateTodo(id, code);
        toast.success('Tags updated!');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <TagsInput
      value={tags}
      onChange={handleChange}
      tagProps={{
        className: 'tag is-primary react-tagsinput-tag',
        classNameRemove: 'react-tagsinput-remove'
      }}
      inputProps={{
        className: `react-tagsinput-input ${length === 5 ? 'hide' : ''}`,
        placeholder: 'Add a tag'
      }}
    />
  );
};

export default TagsInputField;
