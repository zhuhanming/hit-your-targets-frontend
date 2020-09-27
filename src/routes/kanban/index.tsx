import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { useTodo } from 'contexts/todoContext';
import { useView } from 'contexts/viewContext';
import { useSearch } from 'contexts/searchContext';
import RootStateInterface from 'interfaces/RootState';
import PageSection from 'components/pageSection';
import PageTitle from 'components/pageContainer/pageTitle';
import ViewSelector from 'components/viewSelector';
import { View } from 'interfaces/ViewContext';
import { CurrentToDos } from 'reducers/ToDoDux';
import Modal from 'components/modal';
import TodoBodyModalBody from 'components/todoBodyModalBody';
import TodoContainer from 'routes/list/TodoContainer';
import KanbanBoard from './KanbanBoard';

import './Kanban.scss';

const Kanban: React.SFC = () => {
  const { loadTodos } = useTodo();
  const { viewSelected, updateView } = useView();
  const { getFilteredTodos } = useSearch();
  const selectTodos = (state: RootStateInterface): CurrentToDos => state.todos;
  const { todos, completeOrder, incompleteOrder } = useSelector(selectTodos);
  const filteredTodos = getFilteredTodos(todos);
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false,
    taskInFocus: null,
    isModalOpen: false,
  });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    let didCancel = false;

    if (viewSelected === View.TODAY || viewSelected === View.NEXT_SEVEN_DAYS) {
      updateView(View.ALL);
    }

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
  }, [loadTodos, updateView, viewSelected]);

  return (
    <>
      {!isMobile && (
        <Modal
          isOpen={state.isModalOpen}
          handleClose={(): void => setState({ isModalOpen: false })}
        >
          <TodoBodyModalBody
            id={state.taskInFocus}
            todos={filteredTodos}
            isKanban
            setFocus={(id: number | null): void =>
              setState({ taskInFocus: id, isModalOpen: false })
            }
          />
        </Modal>
      )}
      <div className="columns is-marginless is-paddingless kanban-view">
        {isMobile && state.taskInFocus && (
          <div className="is-very-transparent list-view__mobile">
            <TodoContainer
              id={state.taskInFocus}
              setFocus={(id: number | null): void =>
                setState({ taskInFocus: id, isModalOpen: false })
              }
              todos={filteredTodos}
              isMobile={isMobile}
              isKanban
            />
          </div>
        )}
        {(!isMobile || state.taskInFocus === null) && (
          <div className="column is-full is-marginless is-paddingless">
            <div className="columns is-marginless">
              <div className="kanban-view__title">
                <PageSection>
                  <PageTitle titleText="Kanban View" />
                </PageSection>
              </div>
            </div>
            <div className="columns is-marginless">
              <div className="column">
                <div className="kanban-view__selector">
                  <ViewSelector isKanban />
                </div>
              </div>
            </div>
            <div className="columns is-marginless is-paddingless kanban-view__board">
              <KanbanBoard
                todos={filteredTodos}
                isLoading={state.isLoading}
                isError={state.isError}
                setTaskInFocus={(todo): void =>
                  setState({
                    taskInFocus: todo,
                    isModalOpen: !isMobile,
                  })
                }
                completeOrder={completeOrder}
                incompleteOrder={incompleteOrder}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Kanban;
