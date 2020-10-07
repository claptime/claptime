import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import PropTypes from 'claptime/lib/prop-types';

const Container = styled.div`
  .scrolling-text {
    position: relative;
    box-sizing: border-box;
  }

  .text {
    position: relative;
    box-sizing: border-box;
  }

  .scrolling-text:hover {
    animation: text-scroll-over 6s linear infinite;
  }

  /* Make it move! */
  @keyframes text-scroll-over {
    0% {
      top: 0em;
    }
    100% {
      top: -100%;
    }
  }
`;

const TextArea = ({ text, maxHeight, color }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, []);

  return (
    <Container
      className="container"
      style={{ overflow: 'hidden', height: '90%', background: color }}
    >
      <p ref={ref} className={height > maxHeight ? 'scrolling-text' : 'text'}>
        {text}
      </p>
    </Container>
  );
};

TextArea.propTypes = {
  text: PropTypes.string,
  maxHeight: PropTypes.number.isRequired,
  color: PropTypes.string,
};

TextArea.defaultProps = {
  text: '',
  color: 'transparent',
};

export default TextArea;
