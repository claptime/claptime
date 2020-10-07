import React from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import consts from 'claptime/consts';

const Container = styled.div`
  .title {
    text-transform: capitalize;
    font-variant: small-caps;
    font-family: ${consts.style.fonts.stylizedVariant};
    font-size: 1.2em;
    color: ${consts.style.colors.primary};
  }

  .ant-divider-horizontal.ant-divider-with-text-left::before,
  .ant-divider-horizontal.ant-divider-with-text-left::after {
    border-top: 1px solid ${consts.style.colors.primary};
  }
`;

const Charter = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <div id="introduction">
        <Divider orientation="left">
          <span className="title">{t('charter.introduction.title')}</span>
        </Divider>
        <div className="text">{t('charter.introduction.text')}</div>
      </div>
      <div id="objectives">
        <Divider orientation="left">
          <span className="title">{t('charter.objectives.title')}</span>
        </Divider>
        <div className="text">{t('charter.objectives.text')}</div>
      </div>
      <div id="rules">
        <Divider orientation="left">
          <span className="title">{t('charter.rules.title')}</span>
        </Divider>
        <span>{t('charter.rules.introduction')}</span>
        <ul>
          <li>{t('charter.rules.1')}</li>
          <li>{t('charter.rules.2')}</li>
          <li>{t('charter.rules.3')}</li>
        </ul>
        <span>{t('charter.rules.more')}</span>
      </div>
      <div id="copyright">
        <Divider orientation="left">
          <span className="title">{t('charter.copyright.title')}</span>
        </Divider>
        <div className="text">{t('charter.copyright.text')}</div>
      </div>
    </Container>
  );
};
export default Charter;
