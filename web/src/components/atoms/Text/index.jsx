import styled from 'styled-components';
import consts from 'claptime/consts';

const { device, style } = consts;

const StyledText = styled.p`
  font-family: ${style.fonts.default};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;

  @media ${device.mobileS} {
    font-size: 1.5em;
  }

  @media ${device.tablet} {
    font-size: 1.5em;
  }

  @media ${device.laptopL} {
    font-size: 2em;
  }
`;

export default StyledText;
