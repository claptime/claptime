import React from 'react';
import { useTranslation } from 'react-i18next';

import { Subtitle, Title } from 'claptime/components/atoms';
import { Layouts, Links } from 'claptime/components/molecules';
import NavBarTemplate from 'claptime/components/templates/NavBarTemplate';
import PropTypes from 'claptime/lib/prop-types';
import Head from 'claptime/lib/seo/Head';
import { nl2br } from 'claptime/utils/i18n';

const Partner = ({ name, logoSide = 'left', links }) => {
  const { t } = useTranslation();
  return (
    <div style={{ minHeight: 264 }}>
      <div
        style={{
          float: logoSide,
          marginLeft: logoSide === 'left' ? 0 : 32,
          marginRight: logoSide === 'right' ? 0 : 32,
        }}
      >
        <img
          src={`assets/partners/${name}.png`}
          alt={t(`partnersPage.partners.${name}.name`)}
          height={200}
          style={{ marginBottom: 8 }}
        />
        <Links.Buttons links={links || []} centered />
      </div>
      <Subtitle style={{ marginTop: 0, marginBottom: 16 }}>
        {t(`partnersPage.partners.${name}.name`)}
      </Subtitle>
      <p>{nl2br(t(`partnersPage.partners.${name}.description`))}</p>
    </div>
  );
};

Partner.propTypes = {
  name: PropTypes.string.isRequired,
  logoSide: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['FACEBOOK', 'INSTAGRAM', 'LABFILMS', 'WEBSITE'])
        .isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
};

Partner.defaultProps = {
  logoSide: 'left',
  links: [],
};

const PartnersPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head page="partners" />
      <NavBarTemplate>
        <Layouts.Strip isFirst>
          <Title>{t(`partnersPage.pageTitle`)}</Title>
          <Partner
            name="labfilms"
            links={[
              {
                type: 'FACEBOOK',
                url: 'https://www.facebook.com/labfilms/',
              },
              {
                type: 'INSTAGRAM',
                url: 'https://www.instagram.com/asso_labfilms/',
              },
              {
                type: 'WEBSITE',
                url: 'https://www.labfilms.org/',
              },
            ]}
          />
          <Partner
            name="cinerama"
            logoSide="right"
            links={[
              {
                type: 'FACEBOOK',
                url: 'https://www.facebook.com/CineramaProd/',
              },
              {
                type: 'INSTAGRAM',
                url: 'https://www.instagram.com/cinerama_officiel/',
              },
              {
                type: 'WEBSITE',
                url: 'https://www.vod-cinerama.com/',
              },
            ]}
          />
          <Partner
            name="laNuitDesCameras"
            links={[
              {
                type: 'FACEBOOK',
                url:
                  'https://www.facebook.com/La-Nuit-des-Cam%C3%A9ras-478369362930629/',
              },
              {
                type: 'WEBSITE',
                url: 'https://www.lanuitdescameras.fr/',
              },
            ]}
          />
        </Layouts.Strip>
      </NavBarTemplate>
    </>
  );
};

export default PartnersPage;
