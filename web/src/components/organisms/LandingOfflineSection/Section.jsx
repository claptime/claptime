import styled from 'styled-components';
import consts from 'claptime/consts';

const {
  device,
  style: { colors },
} = consts;

const Section = styled.section`
  position: relative;
  padding: 5% 9%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media ${device.mobileS} {
    align-items: center;
    h1 {
      font-size: 2.5em;
      font-variant: small-caps;
      margin-bottom: 0;
    }
    p {
      font-size: 1em;
      margin-bottom: 0.5em;
    }
    p.landing-important {
      font-size: 2em;
      color: ${colors.strawberry};
      font-weight: bold;
    }
  }
  @media ${device.laptop} {
    width: 63%;
    align-items: baseline;
    h1 {
      font-size: 3.5em;
    }
    p {
      font-size: 1.5em;
    }
    p.landing-important {
      font-size: 2.5em;
    }
  }

  @media ${device.laptopL} {
    h1 {
      font-size: 4.5em;
    }
    p {
      font-size: 2em;
    }
    p.landing-important {
      font-size: 3em;
    }
  }
`;

export default Section;
