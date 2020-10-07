import React from 'react';

import { useTranslation } from 'react-i18next';

import consts from 'claptime/consts';

import LandingCarousel from './LandingCarousel';

const Details = () => {
  const { t } = useTranslation();

  const illustrationsSpectators = [
    {
      path: '/assets/animations/concept-2.json',
      title: t('landingPage.viewers.section1.title'),
      text: t('landingPage.viewers.section1.text'),
    },
    {
      path: '/assets/animations/concept-4.json',
      title: t('landingPage.viewers.section2.title'),
      text: t('landingPage.viewers.section2.text'),
    },
    {
      path: '/assets/animations/concept-6.json',
      title: t('landingPage.viewers.section3.title'),
      text: t('landingPage.viewers.section3.text'),
    },
  ];

  const illustrationsFilmmakers = [
    {
      path: '/assets/animations/concept-1.json',
      title: t('landingPage.filmmakers.section1.title'),
      text: t('landingPage.filmmakers.section1.text'),
    },
    {
      path: '/assets/animations/concept-3.json',
      title: t('landingPage.filmmakers.section2.title'),
      text: t('landingPage.filmmakers.section2.text'),
    },
    {
      path: '/assets/animations/concept-5.json',
      title: t('landingPage.filmmakers.section3.title'),
      text: t('landingPage.filmmakers.section3.text'),
    },
  ];

  return (
    <div id="details">
      <div id="details-viewers">
        <LandingCarousel
          title={t('landingPage.forTheViewers')}
          iAm={t('landingPage.iAmViewer')}
          iAmNot={t('landingPage.iAmFilmmaker')}
          iAmSwitchLink="/#details-filmmakers"
          buttonText={t('landingPage.browseTheCollections')}
          illustrations={illustrationsSpectators}
          mainColor={consts.style.colors.illustrationsSpectators}
          secondaryColor={consts.style.colors.illustrationsFilmmakers}
          buttonLink="/#collections"
          textColor={consts.style.colors.primary}
          buttonColor={consts.style.colors.primary}
        />
      </div>
      <div id="details-filmmakers">
        <LandingCarousel
          title={t('landingPage.forTheFilmmakers')}
          iAm={t('landingPage.iAmFilmmaker')}
          iAmNot={t('landingPage.iAmViewer')}
          iAmSwitchLink="/#details-viewers"
          buttonText={t('landingPage.uploadAMovie')}
          illustrations={illustrationsFilmmakers}
          mainColor={consts.style.colors.illustrationsFilmmakers}
          secondaryColor={consts.style.colors.illustrationsSpectators}
          buttonLink="/about/filmmakers"
          textColor={consts.style.colors.primary}
          buttonColor={consts.style.colors.primary}
        />
      </div>
    </div>
  );
};

export default Details;
