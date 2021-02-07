import styled from 'styled-components';
import consts from 'claptime/consts';

const StyledLink = styled.a`
  text-decoration: underline;
  color: ${consts.style.colors.strawberry};
  &:hover {
    color: ${consts.style.colors.strawberryHover};
  }
`;

export default StyledLink;
