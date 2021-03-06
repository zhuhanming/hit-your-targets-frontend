import React from 'react';
import { CSSTransition } from 'react-transition-group';

// Fades todo list items in and out
const FadeTransition: React.FunctionComponent = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={{ enter: 500, exit: 500 }}
  >
    {children}
  </CSSTransition>
);

export default FadeTransition;
