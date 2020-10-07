import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Lottie } from '@crello/react-lottie';

import { Carousel, Layouts } from 'claptime/components/molecules';
import { Title } from 'claptime/components/atoms';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import consts from 'claptime/consts';
import Head from 'claptime/lib/seo/Head';

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

const contentStyle = {
  padding: '10px 20px 30px',
};

const FilmmakersPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Head page="about/filmmakers" />
      <NavBarTemplate>
        <Layouts.Strip
          isFirst
          side="right"
          sideContent={getLottie('/assets/animations/concept-1.json', true)}
        >
          <Title lineColor={consts.style.colors.illustrationsFilmmakers}>
            {t('filmmakersPage.upload.title')}
          </Title>
          <Carousel
            autoplay
            autoplaySpeed={10000}
            dotsColor={consts.style.colors.illustrationsFilmmakers}
          >
            <div>
              <div style={contentStyle}>
                <h2>{t('filmmakersPage.upload.section1.title')}</h2>
                <ol>
                  <li>{t('filmmakersPage.upload.section1.item1')}</li>
                  <li>{t('filmmakersPage.upload.section1.item2')}</li>
                  <li>{t('filmmakersPage.upload.section1.item3')}</li>
                </ol>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <h2>{t('filmmakersPage.upload.section2.title')}</h2>
                <p>{t('filmmakersPage.upload.section2.text')}</p>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <h2>{t('filmmakersPage.upload.section3.title')}</h2>
                <p>{t('filmmakersPage.upload.section3.text')}</p>
              </div>
            </div>
          </Carousel>
        </Layouts.Strip>
        <Layouts.Strip
          background="color-1"
          sideContent={getLottie('/assets/animations/concept-3.json', true)}
        >
          <Title lineColor="white">{t('filmmakersPage.audience.title')}</Title>
          <Carousel
            backgroundColor={consts.style.colors.illustrationsFilmmakers}
            autoplay
            autoplaySpeed={10000}
            dotsColor="white"
          >
            <div>
              <div style={contentStyle}>
                <h2>{t('filmmakersPage.audience.section1.title')}</h2>
                <p>{t('filmmakersPage.audience.section1.text')}</p>
              </div>
            </div>
            <div>
              <div style={contentStyle}>
                <h2>{t('filmmakersPage.audience.section2.title')}</h2>
                <p>{t('filmmakersPage.audience.section2.text')}</p>
              </div>
            </div>
          </Carousel>
        </Layouts.Strip>
        <Layouts.Strip
          side="right"
          sideContent={getLottie('/assets/animations/concept-5.json', true)}
        >
          <Title lineColor={consts.style.colors.illustrationsFilmmakers}>
            {t('filmmakersPage.donations.title')}
          </Title>
          <p>{t('filmmakersPage.donations.text')}</p>
        </Layouts.Strip>
      </NavBarTemplate>
    </>
  );
};

export default FilmmakersPage;
