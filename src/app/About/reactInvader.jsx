const ReactInvader = () => (
  // <!-- const reactInvaderSVG = ({ size - 48, className='' }) => ( -->
  <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    {/* <!-- Outer glow effect --> */}
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="saucerGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" style={{ stopColor: '#87CEEB', stopOpacity: '0.8' }} />
        <stop offset="100%" style={{ stopColor: '#4682B4', stopOpacity: '0.9' }} />
      </radialGradient>
    </defs>

    {/* <!-- UFO saucer dome (top half) --> */}
    <ellipse cx="24" cy="20" rx="16" ry="8" fill="url(#saucerGrad)" opacity="0.9" />
    {/* <ellipse cx="24" cy="20" rx="16" ry="8" fill="url(#saucerGrad)" opacity="0.7" /> */}

    {/* <!-- React electron orbits (modified to look like UFO energy rings) --> */}
    <ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="1.5" opacity="0.4" filter="url(#glow)" />
    <ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="1.5" opacity="0.4" transform="rotate(60 24 24)" />
    <ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#61DAFB" strokeWidth="1.5" opacity="0.4" transform="rotate(-60 24 24)" />

    {/* <!-- UFO lights around the rim --> */}
    <circle cx="8" cy="24" r="1.5" fill="#FFD700" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="16" cy="18" r="1.5" fill="#FF6B6B" opacity="0.9">
      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="32" cy="18" r="1.5" fill="#4ECDC4" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="24" r="1.5" fill="#95E1D3" opacity="0.9">
      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="32" cy="30" r="1.5" fill="#F38BA8" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="16" cy="30" r="1.5" fill="#A8DADC" opacity="0.9">
      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* <!-- Central React atom (spacecraft core) --> */}
    <circle cx="24" cy="24" r="3" fill="#61DAFB" filter="url(#glow)" />

    {/* <!-- Tractor beam effect --> */}
    <polygon points="21,32 27,32 30,44 18,44" fill="#61DAFB" opacity="0.2">
      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
    </polygon>
  </svg>
);

export default ReactInvader;

