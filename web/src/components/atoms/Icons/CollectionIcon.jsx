import React from 'react';

import consts from 'claptime/consts';

function CollectionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="22"
      viewBox="0 0 19 22"
    >
      <path
        fill={consts.style.colors.strawberry}
        d="M.988 21.882c-.41.293-.988.007-.988-.49V.607C0 .271.278 0 .621 0H18.38c.343 0 .621.271.621.606v20.787c0 .496-.577.782-.988.49L9.5 15.816.988 21.882zm8.145-7.306a.637.637 0 01.734 0l7.89 5.623V1.213H1.243v18.986l7.89-5.623z"
      />
    </svg>
  );
}

export default CollectionIcon;
