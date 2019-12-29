import React from 'react';

import { useTheme } from 'contexts/themeContext';

import './FunFact.scss';

const FunFact = () => {
  const { theme } = useTheme();
  return (
    <div className="fun-fact">
      <div className="fun-fact__intro ">This app is still in</div>
      <div className={`fun-fact__stat ${theme}`}>BETA</div>
      <div className="fun-fact__ending">Do wait out!</div>
    </div>
  );
};

export default FunFact;
