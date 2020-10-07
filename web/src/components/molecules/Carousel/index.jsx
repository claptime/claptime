import styled from 'styled-components';

import { Carousel } from 'antd';

import consts from 'claptime/consts';

const StyledCarousel = styled(Carousel)`
  .slick-dots li button,
  .slick-dots li.slick-active button {
    background: ${(props) =>
      props.dotsColor || consts.style.colors.primary} !important;
  }
  &,
  h2 {
    color: ${(props) => props.textColor || consts.style.colors.primary};
    text-shadow: 1px 1px 0px transparent;
  }

  font-size: 1.2em;
  background: ${(props) => props.backgroundColor || 'white'};
`;

export default StyledCarousel;
