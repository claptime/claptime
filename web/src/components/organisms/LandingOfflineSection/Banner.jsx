import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Title } from 'claptime/components/atoms';
import consts from 'claptime/consts';

import Section from './Section';

const {
  style: { colors },
} = consts;

const Banner = () => {
  const { t } = useTranslation();
  return (
    <Section
      style={{
        minHeight: `calc(100vh - ${consts.style.navbar.height})`,
      }}
    >
      <Title underlined={false}>{t('landingPage.banner.text1')}</Title>

      <a href="#details">
        <Button
          color={colors.primary}
          text={t('landingPage.banner.discover')}
        />
      </a>
    </Section>
  );
};

export default Banner;
