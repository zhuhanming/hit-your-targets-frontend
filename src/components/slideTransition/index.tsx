import React from 'react';
import { CSSTransition } from 'react-transition-group';

// Fades in and slides out for todo list items
const SlideTransition: React.FunctionComponent = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    classNames="slide"
    timeout={{ enter: 500, exit: 500 }}
  >
    {children}
  </CSSTransition>
);

export default SlideTransition;
