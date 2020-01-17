import React from 'react';
import { Lottie } from '@crello/react-lottie';
import FadeIn from 'react-fade-in';

import animationData from 'assets/animations/loading.json';
import { useTheme } from 'contexts/themeContext';

import './Loading.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet'
  }
};

const Loading = ({ className = '' }) => {
  const { theme } = useTheme();
  return (
    <div className={`loading ${className} ${theme}`}>
      <FadeIn>
        <Lottie config={defaultOptions} width="auto" height="auto" />
      </FadeIn>
    </div>
  );
};

export default Loading;
