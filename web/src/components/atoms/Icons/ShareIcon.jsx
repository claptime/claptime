import React from 'react';

import consts from 'claptime/consts';

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="102"
      height="88"
      viewBox="0 0 102 88"
    >
      <path
        fill={consts.style.colors.white}
        d="M88.986 43.586L74.38 28.979a4.426 4.426 0 116.285-6.197L98.37 40.488a4.426 4.426 0 010 6.196L80.664 64.39a4.426 4.426 0 01-6.285-6.197l14.607-14.607zm-76.09 0l14.608 14.607a4.426 4.426 0 01-6.286 6.197L3.513 46.684a4.426 4.426 0 010-6.196l17.705-17.706a4.426 4.426 0 016.286 6.197L12.897 43.586zM46.36 80.059a4.426 4.426 0 01-8.587-2.124L55.478 7.113a4.426 4.426 0 118.588 2.124L46.36 80.06z"
      />
    </svg>
  );
}

export default ShareIcon;
