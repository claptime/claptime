import styled from 'styled-components';

import consts from 'claptime/consts';

const Container = styled.section`
  p {
    font-family: ${consts.style.fonts.default};
    text-align: justify;
    text-justify: inter-word;
  }

  h1,
  h2 {
    font-weight: bold;
    color: ${consts.style.colors.primary};
  }

  h1 {
    text-align: center;
  }

  h2 {
    font-family: ${consts.style.fonts.stylized};
  }

  @media ${consts.device.mobileS} {
    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 1.5em;
    }
  }

  @media ${consts.device.laptop} {
    h1 {
      font-size: 3em;
    }
    h2 {
      font-size: 2em;
    }
  }

  .introduction {
    font-weight: bold;
  }
`;

export default Container;
