import React from 'react';
import { CSSTransition } from 'react-transition-group';

interface FadeTransitionProps {
  children: React.ReactNode;
  props?: { [x: string]: any };
}

const FadeTransition: React.SFC<FadeTransitionProps> = ({
  children,
  ...props
}) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={{ enter: 500, exit: 500 }}
  >
    {children}
  </CSSTransition>
);

export default FadeTransition;
