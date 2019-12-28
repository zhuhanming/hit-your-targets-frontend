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
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label className="list-item__content">
        <div className="list-item__title">
          <SkeletonTheme color="#C3C3C3">
            <Skeleton />
          </SkeletonTheme>
        </div>
        {/* <div
          className={`list-item__date is-size-7 ${
            warning ? 'has-text-danger' : ''
          }`}
        >
          {displayDate}
        </div> */}
      </label>
    </li>
  );
};

export default TodoListItem;
