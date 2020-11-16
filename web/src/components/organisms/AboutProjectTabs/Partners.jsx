import React from 'react';
import { useTranslation } from 'react-i18next';

import { Subtitle } from 'claptime/components/atoms';
import { Links } from 'claptime/components/molecules';
import PropTypes from 'claptime/lib/prop-types';
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
          src={`/assets/partners/${name}.png`}
          alt={t(`projectPage.partners.${name}.name`)}
          height={200}
          style={{ marginBottom: 8 }}
        />
        <Links.Buttons links={links || []} centered />
      </div>
      <Subtitle style={{ marginTop: 0, marginBottom: 16 }}>
        {t(`projectPage.partners.${name}.name`)}
      </Subtitle>
      <p>{nl2br(t(`projectPage.partners.${name}.description`))}</p>
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

const Partners = () => {
  return (
    <>
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
    </>
  );
};

export default Partners;
