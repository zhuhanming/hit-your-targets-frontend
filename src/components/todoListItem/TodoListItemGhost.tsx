/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import './TodoListItemGhost.scss';

const TodoListItem = () => {
  return (
    <li className="list-item">
      <input
        type="checkbox"
        className="is-checkradio is-success list-item__content__checkbox"
        disabled
      />
      <label className="list-item__content">
        <div className="list-item__title">
          <SkeletonTheme>
            <Skeleton />
          </SkeletonTheme>
        </div>
      </label>
    </li>
  );
};

export default TodoListItem;
