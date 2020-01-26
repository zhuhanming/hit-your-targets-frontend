import React from 'react';
import { CSSTransition } from 'react-transition-group';

const FadeTransition: React.SFC = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={{ enter: 500, exit: 500 }}
  >
    {children}
  </CSSTransition>
);

export default FadeTransition;
