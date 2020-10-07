import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import Head from 'claptime/lib/seo/Head';

const Container = styled.section`
  .claptime-press-text {
    font-family: ${consts.style.fonts.default};
    text-align: justify;
    text-justify: inter-word;
  }

  h1,
  h2 {
    font-weight: bold;
    color: ${consts.style.colors.primary};
  }

  h1 {
    text-align: center;
  }

  @media ${consts.device.mobileS} {
    margin: 5%;

    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 1.5em;
    }
  }

  @media ${consts.device.laptop} {
    margin: 5% 25% 5%;

    h1 {
      font-size: 3em;
    }
    h2 {
      font-size: 2em;
    }
  }

  #claptime-press-introduction {
    font-weight: bold;
  }
`;

const PressPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head page="about/press" />
      <NavBarTemplate>
        <Container>
          <span>{t('pressPage.date')}</span>
          <h1 style={{ fontFamily: consts.style.fonts.stylized }}>
            {t('pressPage.mainTitle')}
          </h1>
          <p className="claptime-press-text" id="claptime-press-introduction">
            {t('pressPage.introduction')}
          </p>

          <h2 style={{ fontFamily: consts.style.fonts.stylized }}>
            {t('pressPage.section1.title')}
          </h2>
          <p className="claptime-press-text">{t('pressPage.section1.text')}</p>

          <h2 style={{ fontFamily: consts.style.fonts.stylized }}>
            {t('pressPage.section2.title')}
          </h2>
          <p className="claptime-press-text">{t('pressPage.section2.text')}</p>

          <h2 style={{ fontFamily: consts.style.fonts.stylized }}>
            {t('pressPage.section3.title')}
          </h2>
          <p className="claptime-press-text">{t('pressPage.section3.text')}</p>

          <h2 style={{ fontFamily: consts.style.fonts.stylized }}>
            {t('pressPage.section4.title')}
          </h2>
          <p className="claptime-press-text">{t('pressPage.section4.text')}</p>

          <a href="/press.pdf">
            <Button icon={<FilePdfOutlined />}>
              {t('pressPage.downloadButton')}
            </Button>
          </a>
        </Container>
      </NavBarTemplate>
    </>
  );
};

export default PressPage;
