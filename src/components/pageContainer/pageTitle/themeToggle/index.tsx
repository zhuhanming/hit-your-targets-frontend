import React from 'react';

import { useTheme } from 'contexts/themeContext';

import './ThemeToggle.scss';

const ThemeToggle: React.FunctionComponent = () => {
  const { theme, toggle } = useTheme();
  return (
    <div>
      <input
        id="switch"
        type="checkbox"
        name="switch"
        className="switch is-rounded is-large"
        onClick={toggle}
        defaultChecked={theme !== ''}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="switch" />
    </div>
  );
};

export default ThemeToggle;
