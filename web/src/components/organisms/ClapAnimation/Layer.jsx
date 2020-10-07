import React, { useEffect, useRef, useState } from 'react';
import { Motion, spring } from 'react-motion';

import PropTypes from 'claptime/lib/prop-types';

const Layer = ({ layerStyle, config, children }) => {
  const [toStyle, setToStyle] = useState({ y: 0, x: 0 });
  const resizeTimeout = useRef(null);
  const onMouseMove = (e) => {
    if (!resizeTimeout.current) {
      resizeTimeout.current = setTimeout(() => {
        resizeTimeout.current = null;
        const getYFromCenter =
          config.yFactor * (e.view.innerHeight / 2 - e.clientY);
        const getXFromCenter =
          config.xFactor * (e.view.innerWidth / 2 - e.clientX);
        setToStyle({
          x: spring(getXFromCenter, config.springSettings),
          y: spring(getYFromCenter, config.springSettings),
        });
      }, 75);
    }
  };
  useEffect(() => window.addEventListener('mousemove', onMouseMove, false));
  return (
    <Motion style={toStyle}>
      {(motionStyle) => (
        <div
          style={{
            transform: `translate(${motionStyle.x}px, ${motionStyle.y}px)`,
            ...layerStyle,
          }}
        >
          {children}
        </div>
      )}
    </Motion>
  );
};

Layer.propTypes = {
  layerStyle: PropTypes.any,
  config: PropTypes.shape({
    xFactor: PropTypes.number,
    yFactor: PropTypes.number,
    springSettings: PropTypes.shape({
      stiffness: PropTypes.number,
      damping: PropTypes.number,
    }),
  }),
  children: PropTypes.node.isRequired,
};

Layer.defaultProps = {
  layerStyle: {},
  config: {
    xFactor: 0,
    yFactor: 0,
    springSettings: {},
  },
};

export default Layer;
