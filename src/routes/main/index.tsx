import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

import { useUser } from 'contexts/userContext';
import { useTodo } from 'contexts/todoContext';
import { capitalize, randomGreeting } from 'utils';
import RootStateInterface from 'interfaces/RootState';
import PageContainer from 'components/pageContainer';
import PageSection from 'components/pageSection';
import { CurrentToDos } from 'reducers/ToDoDux';
import MainCard from './MainCard';
import CalendarCard from './CalendarCard';
import TasksForToday from './TasksForToday';
import FunFact from './FunFact';
import ProgressOverview from './ProgressOverview';

import './Main.scss';

const Main: React.SFC = () => {
  const { name } = useUser();
  const { loadTodos } = useTodo();
  const selectTodos = (state: RootStateInterface): CurrentToDos => state.todos;
  const { todos } = useSelector(selectTodos);
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false,
    title: randomGreeting(capitalize(name))
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
          isError: true,
          isLoading: false
        });
      }
    }

    return (): void => {
      didCancel = true;
    };
  }, [loadTodos]);

  return (
    <>
      <PageContainer titleText={state.title} className="main-content">
        <PageSection className="main-content__body is-paddingless">
          <div className="main-content__row">
            <div className="columns is-marginless">
              <MainCard title="Tasks for Today">
                <TasksForToday
                  todos={todos.filter(todo => !todo.completed)}
                  isLoading={state.isLoading}
                  isError={state.isError}
                />
              </MainCard>
              <MainCard title="Your Progress">
                <ProgressOverview
                  todos={todos}
                  isLoading={state.isLoading}
                  isError={state.isError}
                />
              </MainCard>
              <MainCard title="Fun Fact of the Day">
                <FunFact todos={todos} />
              </MainCard>
            </div>
          </div>
          <div className="main-content__row">
            <div className="columns is-marginless">
              <CalendarCard title="Upcoming Week">
                <article className="message is-info is-flex">
                  <span className="message-body">
                    Work In Progress - Coming Soon!
                  </span>
                </article>
              </CalendarCard>
            </div>
          </div>
        </PageSection>
      </PageContainer>
    </>
  );
};

export default Main;
