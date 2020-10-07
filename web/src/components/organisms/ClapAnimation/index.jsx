import React, { useState } from 'react';
import { Lottie } from '@crello/react-lottie';

import Layer from './Layer';

const getLayer = (
  children,
  xFactor = 0,
  yFactor = 0,
  stiffness = 0,
  damping = 0,
) => (
  <Layer
    layerStyle={{
      position: 'absolute',
    }}
    config={{
      xFactor, // A percentage of the mousemove distance from the center of the screen on the x axis
      yFactor, // A percentage of the mousemove distance from the center of the screen on the y axis
      springSettings: {
        // The spring configuration settings for react-motion.
        stiffness, // The response and speed of layers in relation to mouse movements
        damping, // The spring and rebound of layers in relation to mouse movements
      },
    }}
  >
    {children}
  </Layer>
);

const getImageLayer = (
  name,
  xFactor = 0,
  yFactor = 0,
  stiffness = 0,
  damping = 0,
) =>
  getLayer(
    <img
      src={`/assets/animations/clap/layers/${name}.png`}
      width="100%"
      height="100%"
      alt="layer"
    />,
    xFactor,
    yFactor,
    stiffness,
    damping,
  );

const ClapAnimation = () => {
  const [animationPlayingState, setAnimationPlayingState] = useState('stopped');
  return (
    <span
      style={{
        filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))',
      }}
    >
      <div
        role="button"
        style={{
          width: 250,
          height: 250,
          position: 'relative',
          overflow: 'hidden',
          clipPath: 'circle(125px at center)',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}
        onClick={() => setAnimationPlayingState('playing')}
        onKeyPress={() => setAnimationPlayingState('playing')}
        tabIndex="0"
      >
        {getLayer(
          <Lottie
            playingState={animationPlayingState}
            config={{
              loop: false,
              autoplay: true,
              path: '/assets/animations/clap/clap.json',
              rendererSettings: {},
            }}
            isStopped={false}
            isPaused={false}
          />,
        )}
        {getImageLayer('banknote1', -0.1, 0.1, 200, 100)}
        {getImageLayer('banknote2', 0.1, -0.1, 200, 100)}
        {getImageLayer('banknote3', -0.1, -0.1, 50, 10)}
        {getImageLayer('banknote4', 0.1, 0.5, 50, 100)}
        {getImageLayer('hands', 0.05, 0.05, 20, 25)}
        {getImageLayer('banknote5', 0.2, 0.1, 20, 10)}
      </div>
    </span>
  );
};

export default ClapAnimation;
