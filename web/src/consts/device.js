export const sizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  mobileLandscape: 480,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export default {
  mobileS: `(min-width: ${sizes.mobileS}px)`,
  mobileM: `(min-width: ${sizes.mobileM}px)`,
  mobileL: `(min-width: ${sizes.mobileL}px)`,
  mobileLandscape: `(min-width: ${sizes.mobileLandscape}px)`,
  tablet: `(min-width: ${sizes.tablet}px)`,
  laptop: `(min-width: ${sizes.laptop}px)`,
  laptopL: `(min-width: ${sizes.laptopL}px)`,
  desktop: `(min-width: ${sizes.desktop}px)`,
};
