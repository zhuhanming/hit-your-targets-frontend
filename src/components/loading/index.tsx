import React from 'react';
import Lottie from 'react-lottie';
import FadeIn from 'react-fade-in';

import animationData from 'assets/animations/loading.json';

import './Loading.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Loading = ({ className = '' }) => {
  return (
    <FadeIn>
      <div className={`loading ${className}`}>
        <Lottie options={defaultOptions} width="auto" />
      </div>
    </FadeIn>
  );
};

export default Loading;