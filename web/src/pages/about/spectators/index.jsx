import React from 'react';
import { useTranslation } from 'react-i18next';

import { Lottie } from '@crello/react-lottie';

import { Carousel, Layouts } from 'claptime/components/molecules';
import { Subtitle, Title } from 'claptime/components/atoms';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import Head from 'claptime/lib/seo/Head';

const contentStyle = {
  padding: '10px 20px 30px',
};

const getLottie = (path, playing) => (
  <Lottie
    playingState={playing ? 'playing' : 'stopped'}
    config={{
      autoplay: false,
      loop: true,
      path,
      rendererSettings: {},
    }}
  />
);

const SpectatorsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head page="about/spectators" />
      <NavBarTemplate>
        <Layouts.Strip
          isFirst
          sideContent={getLottie('/assets/animations/concept-2.json', true)}
        >
          <Title lineColor={consts.style.colors.illustrationsSpectators}>
            {t('spectatorsPage.catalogue.title')}
          </Title>
          <p>{t('spectatorsPage.catalogue.text1')}</p>
          <p>{t('spectatorsPage.catalogue.text2')}</p>
          <p>{t('spectatorsPage.catalogue.text3')}</p>
        </Layouts.Strip>
        <Layouts.Strip
          background="color-2"
          side="right"
          sideContent={getLottie('/assets/animations/concept-4.json', true)}
        >
          <Title lineColor="white">
            {t('spectatorsPage.collections.title')}
          </Title>
          <Carousel
            autoplay
            autoplaySpeed={10000}
            backgroundColor={consts.style.colors.illustrationsSpectators}
            dotsColor="white"
          >
            <div>
              <div style={contentStyle}>
                <h2>{t('spectatorsPage.collections.section1.title')}</h2>
                <p>{t('spectatorsPage.collections.section1.text')}</p>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <h2>{t('spectatorsPage.collections.section2.title')}</h2>
                <p>{t('spectatorsPage.collections.section2.text')}</p>
              </div>
            </div>
          </Carousel>
        </Layouts.Strip>
        <Layouts.Strip
          sideContent={getLottie('/assets/animations/concept-6.json', true)}
        >
          <Title lineColor={consts.style.colors.illustrationsSpectators}>
            {t('spectatorsPage.supportFilmmakers.title')}
          </Title>
          <p>{t('spectatorsPage.supportFilmmakers.text1')}</p>
          <Subtitle>
            {t('spectatorsPage.supportFilmmakers.participationInTheHat')}
          </Subtitle>
          <p>{t('spectatorsPage.supportFilmmakers.text2')}</p>
        </Layouts.Strip>
      </NavBarTemplate>
    </>
  );
};

export default SpectatorsPage;
