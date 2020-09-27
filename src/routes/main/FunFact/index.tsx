import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { useTheme } from 'contexts/themeContext';
import RootStateInterface from 'interfaces/RootState';
import { CurrentMisc, setFunFact } from 'reducers/MiscDux';
import { isToday } from 'utils/timeUtils';
import { generateFunFact, FactType, getStats } from 'utils/funFactUtils';

import ToDo from 'interfaces/ToDo';
import FunFactGhost from './FunFactGhost';

import './FunFact.scss';

interface FunFactProps {
  todos: ToDo[];
}

const FunFact: React.FunctionComponent<FunFactProps> = ({ todos }) => {
  const dispatch = useDispatch();
  const selectMisc = (state: RootStateInterface): CurrentMisc => state.misc;
  const { funFact } = useSelector(selectMisc);
  const { theme } = useTheme();
  useEffect(() => {
    if (
      funFact === undefined ||
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

  if (funFact === undefined || funFact.fact === null) {
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

  // Get display details using helper function
  const { intro, stat, end } = getStats(
    todos,
    funFact.fact.intro,
    funFact.fact.end,
    funFact.fact.stat
  );

  return (
    <div className="fun-fact">
      <div className="fun-fact__intro ">{intro}</div>
      <div className={`fun-fact__stat ${theme}`}>{stat}</div>
      <div className="fun-fact__ending">{end}</div>
    </div>
  );
};

export default FunFact;
