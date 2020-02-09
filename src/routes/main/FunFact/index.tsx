/* eslint-disable no-case-declarations */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { useTheme } from 'contexts/themeContext';
import RootStateInterface from 'interfaces/RootState';
import { CurrentMisc, setFunFact } from 'reducers/MiscDux';
import { isToday, getDisplayDate } from 'utils/timeUtils';
import { generateFunFact, FactType, StatType } from 'utils/funFactUtils';

import ToDo from 'interfaces/ToDo';
import FunFactGhost from './FunFactGhost';

import './FunFact.scss';

interface FunFactProps {
  todos: ToDo[];
}

const FunFact: React.SFC<FunFactProps> = ({ todos }) => {
  const dispatch = useDispatch();
  const selectMisc = (state: RootStateInterface): CurrentMisc => state.misc;
  const { funFact } = useSelector(selectMisc);
  const { theme } = useTheme();
  useEffect(() => {
    if (
      funFact.fact === null ||
      funFact.lastUpdated === null ||
      !isToday(moment(funFact.lastUpdated))
    ) {
      const newFunFact = generateFunFact();
      dispatch(
        setFunFact({ fact: newFunFact, lastUpdated: new Date(Date.now()) })
      );
    }
  }, [dispatch, funFact]);

  if (funFact.fact === null) {
    return <FunFactGhost />;
  }

  if (funFact.fact.type === FactType.TEXT) {
    return (
      <div className="fun-fact">
        <div className="fun-fact__intro ">{funFact.fact.intro}</div>
        <div className={`fun-fact__stat ${theme}`}>{funFact.fact.stat}</div>
        <div className="fun-fact__ending">{funFact.fact.end}</div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="fun-fact">
        <div className="fun-fact__intro ">You currently have</div>
        <div className={`fun-fact__stat ${theme}`}>0</div>
        <div className="fun-fact__ending">
          tasks created! Get started via the menu on the left now!
        </div>
      </div>
    );
  }

  let finalStat;
  let { intro, end } = funFact.fact;
  const completedTasksLength = todos.filter(t => t.completed).length;
  const todosWithSubtodos = todos.filter(t => t.subtodos.length > 0);

  switch (funFact.fact.stat) {
    case StatType.COMPLETION_RATE:
      if (completedTasksLength === 0) {
        intro = 'You have yet to complete';
        finalStat = 'ANY';
        end += ' Get started with the menu on the left now!';
      } else {
        finalStat = `${Math.round(
          (completedTasksLength / todos.length) * 100
        )}%`;
      }
      break;
    case StatType.NUMBER_OF_COMPLETE_TASKS:
      finalStat = completedTasksLength;
      if (finalStat === 0) {
        end += ' Time to work harder!';
      }
      break;
    case StatType.NUMBER_OF_INCOMPLETE_TASKS:
      finalStat = todos.length - completedTasksLength;
      if (finalStat === 0) {
        finalStat = 'ALL';
        end = 'of your tasks! Good job!';
      }
      break;
    case StatType.OLDEST_TASK_CREATION_DATE:
      const todoSlice = todos.slice();
      todoSlice.sort(
        (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
      );
      finalStat = getDisplayDate(todoSlice[0].createdAt);
      break;
    case StatType.MOST_COMPLETED_TASK_PERCENTAGE:
      if (
        todosWithSubtodos.length === 0 &&
        todos.length > completedTasksLength
      ) {
        finalStat = '0%';
        end += ' You need to work harder!';
      } else {
        finalStat = todos
          .filter(t => !t.completed)
          .map(
            t => t.subtodos.filter(s => s.completed).length / t.subtodos.length
          );
        finalStat.sort();
        [finalStat] = finalStat;
        finalStat = `${Math.ceil(finalStat * 100)}%`;
        if (finalStat === 0) {
          finalStat = '0%';
          end += ' You need to work harder!';
        }
      }
      break;
    case StatType.MOST_COMMON_TAG:
      const allTags = todos.reduce(
        (a, { tags }) => a.concat(tags),
        [] as string[]
      );
      const counts = allTags.reduce((d, tag) => {
        // eslint-disable-next-line no-param-reassign
        d[tag] = (d[tag] || 0) + 1;
        return d;
      }, {});
      const maxCount = Math.max(...(Object.values(counts) as number[]));
      const mostFrequent = Object.keys(counts).filter(
        k => counts[k] === maxCount
      );
      if (mostFrequent.length === 0) {
        intro = 'You have yet to create any';
        finalStat = 'TAGS';
        end = 'Try it out now!';
      } else {
        [finalStat] = mostFrequent;
      }
      break;
    default:
      break;
  }
  return (
    <div className="fun-fact">
      <div className="fun-fact__intro ">{intro}</div>
      <div className={`fun-fact__stat ${theme}`}>{finalStat}</div>
      <div className="fun-fact__ending">{end}</div>
    </div>
  );
};

export default FunFact;
