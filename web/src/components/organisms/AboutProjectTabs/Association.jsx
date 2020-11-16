import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { ContactUsButton } from 'claptime/components/atoms';
import { nl2br } from 'claptime/utils/i18n';

import Container from './Container';

const Association = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <p className="introduction">
        {t('projectPage.association.introduction')}
      </p>

      <h2>{t('projectPage.association.labfilms.title')}</h2>
      <div style={{ display: 'flex' }}>
        <img
          src="/assets/partners/labfilms.png"
          alt={t(`projectPage.association.labfilms`)}
          style={{ height: 200, marginRight: 32 }}
        />
        <p className="text">
          {nl2br(t('projectPage.association.labfilms.text'))}
        </p>
      </div>
      <a
        href="https://www.labfilms.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>{t('projectPage.association.labfilms.ctaText')}</Button>
      </a>
      <br />
      <br />

      <h2>{t('projectPage.association.openSource.title')}</h2>
      <p className="text">
        {nl2br(t('projectPage.association.openSource.text'))}
      </p>
      <a
        href="https://github.com/claptime/claptime/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>{t('projectPage.association.openSource.ctaText')}</Button>
      </a>
      <br />
      <br />

      <h2>{t('projectPage.association.contributing.title')}</h2>
      <p className="text">
        {nl2br(t('projectPage.association.contributing.text'))}
        <ul>
          <li>{t('projectPage.association.contributing.item1')}</li>
          <li>{t('projectPage.association.contributing.item2')}</li>
          <li>{t('projectPage.association.contributing.item3')}</li>
          <li>{t('projectPage.association.contributing.item4')}</li>
        </ul>
      </p>
      <ContactUsButton
        buttonText={t('projectPage.association.contributing.ctaText')}
      />
    </Container>
  );
};

export default Association;
