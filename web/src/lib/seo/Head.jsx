import React from 'react';
import NextHead from 'next/head';
import { useTranslation } from 'react-i18next';

import { getDefault } from 'claptime/lib/languages';
import PropTypes from 'claptime/lib/prop-types';
import { useUserState } from 'claptime/lib/user';

const Head = ({ page, params, imageUrl }) => {
  const { t } = useTranslation();
  const user = useUserState();
  const title = t(`seo.${page}.title`, params) || t('seo.default.title');
  const description =
    t(`seo.${page}.description`, params) || t('seo.default.description');
  return (
    <NextHead>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="metaTitle" property="og:title" content={title} />
      <meta
        key="metaDescription"
        property="og:description"
        content={description}
      />
      <meta
        key="metaLocale"
        property="og:locale"
        content={user.locale || getDefault()}
      />
      <meta key="metaType" property="og:type" content="website" />
      <meta key="metaImage" property="og:image" content={imageUrl} />
    </NextHead>
  );
};

Head.propTypes = {
  page: PropTypes.string.isRequired,
  params: PropTypes.object,
  imageUrl: PropTypes.string,
};

Head.defaultProps = {
  params: {},
  imageUrl: 'https://www.clap-time.com/opengraph.jpg',
};

export default Head;
