import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'claptime/lib/prop-types';
import { Covers } from 'claptime/components/atoms';

const categoryCardAppears = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  animation: ${categoryCardAppears} 0.5s ease-in-out 0s 1;
`;

const CategoryCard = ({ category }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Covers.Category
        className="category-card"
        category={category}
        clickable
        text={t(`categories.${category}.name`)}
        shadow
      />
    </Container>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryCard;
