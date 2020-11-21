import styled from 'styled-components';
import consts from 'consts';

const {
  device: { mobileS, tablet },
} = consts;

const StyledButtonGroup = styled.div`
  @media ${mobileS} {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      margin: 0 0 15px 0;
    }
  }
  @media ${tablet} {
    flex-direction: row;
    button {
      margin: 0 15px 0 0;
    }
  }
`;

export default StyledButtonGroup;
