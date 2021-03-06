import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { useTodo } from 'contexts/todoContext';
import { useSearch } from 'contexts/searchContext';
import RootStateInterface from 'interfaces/RootState';
import PageContainer from 'components/pageContainer';
import PageSection from 'components/pageSection';
import { CurrentToDos } from 'reducers/ToDoDux';
import TodoList from './TodoList';
import TodoContainer from './TodoContainer';

import './List.scss';

const List: React.FunctionComponent = () => {
  const { loadTodos } = useTodo();
  const { getFilteredTodos } = useSearch();
  const selectTodos = (state: RootStateInterface): CurrentToDos => state.todos;
  const { todos } = useSelector(selectTodos);
  const filteredTodos = getFilteredTodos(todos);
  const [state, setState] = useReducer(
    (
      s: {
        isLoading: boolean;
        isError: boolean;
        taskInFocus: number | null;
      },
      a: {
        isLoading?: boolean;
        isError?: boolean;
        taskInFocus?: number | null;
      }
    ) => ({ ...s, ...a }),
    {
      isLoading: true,
      isError: false,
      taskInFocus: null,
    }
  );

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      try {
        loadTodos();
        setState({
          isLoading: false,
        });
      } catch (error) {
        setState({
          isLoading: false,
          isError: true,
        });
      }
    }

    return (): void => {
      didCancel = true;
    };
  }, [loadTodos]);

  return (
    <div className="columns is-marginless is-paddingless list-view">
      {isMobile && state.taskInFocus && (
        <div className="is-very-transparent list-view__mobile">
          <TodoContainer
            id={state.taskInFocus}
            setFocus={(id: number | null): void =>
              setState({ taskInFocus: id })
            }
            todos={filteredTodos}
            isMobile={isMobile}
          />
        </div>
      )}
      {(!isMobile || (isMobile && !state.taskInFocus)) && (
        <>
          <div className="column is-half is-marginless is-paddingless list-view__column">
            <PageContainer titleText="List View">
              <PageSection>
                <TodoList
                  todos={filteredTodos}
                  isLoading={state.isLoading}
                  isError={state.isError}
                  setFocus={(id: number | null): void =>
                    setState({ taskInFocus: id })
                  }
                  focus={state.taskInFocus}
                  isMobile={isMobile}
                />
              </PageSection>
            </PageContainer>
          </div>
          <div className="column is-half is-marginless is-paddingless is-very-transparent list-view__column list-view__focused-task">
            <TodoContainer
              id={state.taskInFocus}
              setFocus={(id: number | null): void =>
                setState({ taskInFocus: id })
              }
              todos={filteredTodos}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default List;
