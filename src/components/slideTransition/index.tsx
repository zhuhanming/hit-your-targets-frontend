import React from 'react';
import { CSSTransition } from 'react-transition-group';

interface SlideTransitionProps {
  children: React.ReactNode;
  props?: { [x: string]: any };
}

const SlideTransition: React.SFC<SlideTransitionProps> = ({
  children,
  ...props
}) => (
  <CSSTransition
    {...props}
    classNames="slide"
    timeout={{ enter: 500, exit: 500 }}
  >
    {children}
  </CSSTransition>
);

export default SlideTransition;
