import React from 'react';

import consts from 'claptime/consts';

function DotsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 37.5"
      enableBackground="new 0 0 30 30"
    >
      <g>
        <path
          d="M16,26.3c-5.1,0-9.2-4.1-9.2-9.2V4.5c0-0.4,0.3-0.8,0.8-0.8h17c0.5,0,0.8,0.3,0.8,0.8V17C25.2,22.1,21.1,26.3,16,26.3z    M8.2,5.3V17c0,4.3,3.4,7.7,7.7,7.7s7.7-3.4,7.7-7.7V5.3H8.2z"
          color={consts.style.colors.primary}
        />
      </g>
      <g>
        <path
          d="M19.3,20c-0.2,0-0.4-0.1-0.5-0.2c-2-2-3.8-2-5.7,0c-0.3,0.3-0.8,0.3-1,0c-0.3-0.3-0.3-0.8,0-1.1c2.5-2.6,5.3-2.6,7.8,0   c0.3,0.3,0.3,0.8,0,1.1C19.7,20,19.6,20,19.3,20z"
          color={consts.style.colors.primary}
        />
      </g>
      <g>
        <path
          d="M12.6,11.5c-0.7,0-1.3-0.3-1.9-0.9c-0.4-0.3-0.4-0.8-0.1-1.1c0.3-0.3,0.8-0.3,1.1,0c0.7,0.7,1.2,0.7,1.9,0   c0.3-0.3,0.8-0.3,1,0c0.3,0.3,0.3,0.8,0,1.1C13.9,11.2,13.3,11.5,12.6,11.5z"
          color={consts.style.colors.primary}
        />
      </g>
      <g>
        <path
          d="M19.4,11.5c-0.7,0-1.3-0.3-2-0.9c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1,0c0.7,0.7,1.2,0.7,1.9,0c0.3-0.3,0.8-0.3,1.1,0   c0.3,0.3,0.3,0.7,0,1.1C20.8,11.2,20.1,11.5,19.4,11.5z"
          color={consts.style.colors.primary}
        />
      </g>
    </svg>
  );
}

export default DotsIcon;
