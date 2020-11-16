import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from './Container';

const Manifest = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <p className="introduction">{t('projectPage.manifest.introduction')}</p>

      <h2>{t('projectPage.manifest.section1.title')}</h2>
      <p>{t('projectPage.manifest.section1.text')}</p>

      <h2>{t('projectPage.manifest.section2.title')}</h2>
      <p>{t('projectPage.manifest.section2.text')}</p>

      <h2>{t('projectPage.manifest.section3.title')}</h2>
      <p>{t('projectPage.manifest.section3.text')}</p>

      <h2>{t('projectPage.manifest.section4.title')}</h2>
      <p>{t('projectPage.manifest.section4.text')}</p>
    </Container>
  );
};

export default Manifest;
