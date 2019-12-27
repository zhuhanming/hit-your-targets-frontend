import React from 'react';
import Lottie from 'react-lottie';
import FadeIn from 'react-fade-in';

import animationData from 'assets/animations/loading.json';
import { useTheme } from 'contexts/themeContext';

import './Loading.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Loading = ({ className = '' }) => {
  const { theme } = useTheme();
  return (
    <div className={`loading ${className} ${theme}`}>
      <FadeIn>
        <Lottie options={defaultOptions} width="auto" height="auto" />
      </FadeIn>
    </div>
  );
};

export default Loading;
