import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styles from "./index.module.sass";

export const FADE = 'FADE';
export const SCALE = 'SCALE';
export const HEIGHT = 'HEIGHT';
export const RIGHT = 'RIGHT';
export const BOTTOM = 'BOTTOM';
export const TOP = 'TOP';
export const LEFT = 'LEFT';

export default function Animated(props) {
  const { children, show, type, exitTimeout } = props;

  const main = useRef(null);

  return (
    <CSSTransition
      timeout={{
        enter: 500,
        exit: exitTimeout,
      }}
      classNames={{
        appear: styles[`${type}_appear`],
        appearActive: styles[`${type}_appearActive`],
        appearDone: styles[`${type}_appearDone`],
        enter: styles[`${type}_enter`],
        enterActive: styles[`${type}_enterActive`],
        enterDone: styles[`${type}_enterDone`],
        exit: styles[`${type}_exit`],
        exitActive: styles[`${type}_exitActive`],
        exitDone: styles[`${type}_exitDone`],
      }}
      mountOnEnter
      unmountOnExit
      in={show}
    >
      {/* <div ref={main}>{children}</div> */}
      {children}
    </CSSTransition>
  );
}

Animated.propTypes = {
  children: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
};

Animated.defaultProps = {
  type: FADE,
  exitTimeout: 500
}
