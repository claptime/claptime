import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 9%;
`;

const Column = styled.div`
  width: 30%;
  min-width: 316px;
  margin-left: 8px;
  margin-right: 8px;
`;

export default {
  Row,
  Column,
};
