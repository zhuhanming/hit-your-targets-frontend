import React from 'react';
import { CSSTransition } from 'react-transition-group';

const SlideTransition: React.SFC = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    classNames="slide"
    timeout={{ enter: 500, exit: 500 }}
  >
    {children}
  </CSSTransition>
);

export default SlideTransition;
