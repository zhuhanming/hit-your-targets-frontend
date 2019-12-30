import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTodo } from 'contexts/todoContext';
import RootStateInterface from 'interfaces/RootState';
import PageContainer from 'components/pageContainer';
import PageSection from 'components/pageSection';
import TodoList from './TodoList';

import './List.scss';

const List = () => {
  const { loadTodos } = useTodo();
  const selectTodos = (state: RootStateInterface) => state.todos;
  const { todos } = useSelector(selectTodos);
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false,
    taskInFocus: null
  });

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      try {
        loadTodos();
        setState({
          isLoading: false
        });
      } catch (error) {
        setState({
          isError: true
        });
      }
    }

    return () => {
      didCancel = true;
    };
  }, [loadTodos]);

  return (
    <div className="columns is-marginless is-paddingless list-view">
      <div className="column is-half is-marginless is-paddingless list-view__column">
        <PageContainer titleText="List View">
          <PageSection>
            <TodoList
              todos={todos}
              isLoading={state.isLoading}
              isError={state.isError}
              setFocus={id => setState({ taskInFocus: id })}
              focus={state.taskInFocus}
            />
          </PageSection>
        </PageContainer>
      </div>
      <div className="column is-half is-marginless is-paddingless is-very-transparent list-view__column">
        {/* <TodoContainer> */}
      </div>
    </div>
  );
};

export default List;