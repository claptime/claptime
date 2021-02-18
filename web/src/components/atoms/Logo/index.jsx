import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const StyledLogo = styled.svg`
  height: 100%;
`;

const SmallLogo = ({ color }) => (
  <StyledLogo
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1658.000000 1658.000000"
  >
    <g
      transform="translate(0.000000,1658.000000) scale(0.100000,-0.100000)"
      fill={color}
      stroke="none"
    >
      <path d="M9419 11673 c-976 -1087 -2369 -2641 -3096 -3452 -728 -811 -1323 -1477 -1323 -1480 0 -3 197 -119 438 -258 240 -138 907 -521 1481 -852 574 -331 1045 -601 1046 -601 2 0 -33 55 -78 122 -287 430 -467 985 -543 1668 -21 198 -30 754 -15 980 99 1479 723 2460 1763 2775 259 79 613 117 877 95 483 -40 899 -223 1289 -569 l92 -82 0 48 c-1 113 -148 3574 -152 3579 -3 2 -804 -885 -1779 -1973z" />
      <path d="M9850 10345 c-705 -141 -1315 -1123 -1474 -2370 -44 -349 -48 -868 -7 -1200 93 -768 326 -1383 690 -1817 201 -240 443 -400 708 -469 217 -56 591 -28 870 66 233 78 479 231 647 403 l49 50 48 -51 c27 -29 48 -57 49 -64 0 -15 -173 -178 -285 -268 -314 -252 -648 -401 -1035 -461 -117 -18 -390 -24 -540 -11 l-95 8 75 -45 c189 -112 2093 -1206 2095 -1204 2 2 -277 6780 -285 6923 0 6 -6 2 -14 -7 -11 -16 -17 -12 -62 33 -112 115 -314 260 -459 329 -236 113 -511 171 -792 169 -65 0 -147 -7 -183 -14z" />
    </g>
  </StyledLogo>
);

SmallLogo.propTypes = {
  color: PropTypes.string.isRequired,
};

const LargeLogo = ({ color }) => (
  <StyledLogo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.74 124.07">
    <g>
      <path
        fill={color}
        d="M33,23.61a20.84,20.84,0,0,1,16.09,6.71L50.28,29c-5.58-6-12.4-9.16-19.78-9.16C11.51,19.82,0,34.9,0,59.71S11.51,99.6,30.5,99.6c7.38,0,14.2-3.13,19.78-9.17l-1.23-1.34C44.7,93.68,39.56,95.8,33,95.8,21.34,95.8,12.4,80.27,12.4,60.38,12.4,40.83,21.9,23.61,33,23.61Z"
      />
      <path
        fill={color}
        d="M75.68,77.59V21.49h-12v56.1c0,16.75,4.24,21.68,18.54,21.68V97.81C77.8,97.81,75.68,90.43,75.68,77.59Z"
      />
      <path
        fill={color}
        d="M129.67,50.1A20.05,20.05,0,0,0,116,44.73c-15.76,0-22.58,14.19-22.58,27.38,0,17.88,7.38,27.49,21,27.49,7.82,0,12.18-4.35,15.2-9.5v7.71h12.06V46.52H129.67Zm0,37.43c-3.35,5.59-8.72,9.39-13.3,9.39-6,0-9.72-10.06-9.72-24.81,0-15,4.25-24.8,11.28-24.8a16.4,16.4,0,0,1,11.74,4.57Z"
      />
      <path
        fill={color}
        d="M341.74,51c-2.23,0-4.36,2.12-7.93,6.15-1.9,2-2.24,2.35-3.8,3.9v33.3l16.76-.62v-34C346.77,53.57,345.43,51,341.74,51Z"
      />
      <path
        fill={color}
        d="M313.47,51c-2.23,0-4.36,2.12-7.93,6.15-1.9,2-2.24,2.35-3.8,3.9V95.38l16.76-.61V59.71C318.5,53.57,317.16,51,313.47,51Z"
      />
      <path
        fill={color}
        d="M401.71,52.86l-10.06-4.07c-3.19,4-5.31,12.64-5.39,22.54h18.55C404.75,64.05,403.59,57.43,401.71,52.86Z"
      />
      <path
        fill={color}
        d="M415.08,58.26A32.66,32.66,0,0,1,418,71.33V73H386.26c.06,8.43,1.64,15,4.46,19.09l99-3.65Z"
      />
      <path
        fill={color}
        d="M271.44,2.39a6.5,6.5,0,0,1-6.6,6.7,6.54,6.54,0,0,1-6.57-6.27L226.48,34H233V46.52h12.18V48.2H233V79.49c0,13,1.45,17.65,6.48,17.65a31.86,31.86,0,0,0,4.92-.78V97.5L259.14,97V46.52h11.51v50l19.58-.72V46.52h11.51V59.71c7.82-11.07,10.28-15,16.76-15,8.15,0,11.51,4.36,11.51,15,7.82-11.07,10.28-15,16.76-15,8.16,0,11.51,4.36,11.51,15V93.3l20.88-.77c-4-4.73-6.2-11.68-6.2-20.42,0-12.86,4.87-21.86,13.22-25.53L271,0A6.72,6.72,0,0,1,271.44,2.39Z"
      />
      <path
        fill={color}
        d="M220.91,79.49v-40L202.64,57.38c-3.2-8.29-9.61-12.65-18.86-12.65-4.13,0-8.26,2.69-11.73,7.49V44.73H160.76v79.34h11.29v-24l13.2-.47,2.1-.07,41.35-1.45C223.53,95.63,220.91,89.44,220.91,79.49ZM183.45,97c-4.36,0-7.93-2.12-11.4-6.71V55.13c3.69-5.26,6.59-7.49,9.84-7.49,6.21,0,9.36,6.7,9.87,20.42,0,1.32.07,2.71.07,4.17C191.83,88.54,189.26,97,183.45,97Z"
      />
    </g>
  </StyledLogo>
);

LargeLogo.propTypes = {
  color: PropTypes.string.isRequired,
};

const Logo = ({ size }) => {
  const color = consts.style.colors.primary;
  return (
    <Link href="/">
      <a>
        {size === 'small' && <SmallLogo color={color} />}
        {size === 'large' && <LargeLogo color={color} />}
      </a>
    </Link>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
};

Logo.defaultProps = {
  size: 'large',
};

export default Logo;
