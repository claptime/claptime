import React from 'react';

import consts from 'consts';

import { Carousel } from 'claptime/components/molecules';

import StarringVideoNode from 'claptime/components/organisms/StarringVideoNode';

const {
  style: {
    colors: { grey },
  },
} = consts;

const StarringVideoNodesCarousel = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Carousel dotsColor={grey}>
      {items.map((i) => (
        <StarringVideoNode
          key={`carousel-starring-videonode-${i}`}
          starringVideoNode={i}
        />
      ))}
    </Carousel>
  );
};

export default StarringVideoNodesCarousel;
