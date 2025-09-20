const PlayerSpaceship = () => (
    <svg
        width='96'
        height='96'
        viewBox='0 0 48 48'
        xmlns='http://www.w3.org/2000/svg'
    >
        <defs>
            {/* Glow effects */}
            <filter id='shipGlow'>
                <feGaussianBlur stdDeviation='2' result='coloredBlur' />
                <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                </feMerge>
            </filter>
            <filter id='engineGlow'>
                <feGaussianBlur stdDeviation='3' result='coloredBlur' />
                <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                </feMerge>
            </filter>

            {/* Ship hull gradient */}
            <linearGradient id='hullGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#4A4A4A', stopOpacity: 1 }} />
                <stop offset='50%' style={{ stopColor: '#3A3A3A', stopOpacity: 1 }} />
                <stop offset='100%' style={{ stopColor: '#2F2F2F', stopOpacity: 1 }} />
            </linearGradient>

            {/* Engine gradient */}
            <linearGradient id='engineGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#FF4500', stopOpacity: 1 }} />
                <stop offset='50%' style={{ stopColor: '#FF6347', stopOpacity: 0.8 }} />
                <stop offset='100%' style={{ stopColor: '#FFA500', stopOpacity: 0.3 }} />
            </linearGradient>

            {/* Cockpit gradient */}
            <radialGradient id='cockpitGrad' cx='50%' cy='30%' r='70%'>
                <stop offset='0%' style={{ stopColor: '#87CEEB', stopOpacity: 0.8 }} />
                <stop offset='100%' style={{ stopColor: '#4682B4', stopOpacity: 0.3 }} />
            </radialGradient>
        </defs>

        {/* Engine exhaust trails */}
        <ellipse cx='18' cy='42' rx='3' ry='6' fill='url(#engineGrad)' opacity='0.8' filter='url(#engineGlow)'>
            <animate attributeName='ry' values='6;8;6' dur='0.5s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='0.6;1;0.6' dur='0.5s' repeatCount='indefinite' />
        </ellipse>
        <ellipse cx='30' cy='42' rx='3' ry='6' fill='url(#engineGrad)' opacity='0.8' filter='url(#engineGlow)'>
            <animate attributeName='ry' values='6;8;6' dur='0.5s' begin='0.25s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='0.6;1;0.6' dur='0.5s' begin='0.25s' repeatCount='indefinite' />
        </ellipse>

        {/* Main wings */}
        <polygon points='24,20 8,32 12,36 24,28' fill='url(#hullGrad)' stroke='antiquewhite' strokeWidth='1' />
        <polygon points='24,20 40,32 36,36 24,28' fill='url(#hullGrad)' stroke='antiquewhite' strokeWidth='1' />

        {/* Wing details */}
        <rect x='10' y='30' width='6' height='2' fill='antiquewhite' rx='1' />
        <rect x='32' y='30' width='6' height='2' fill='antiquewhite' rx='1' />

        {/* Main fuselage */}
        <polygon points='24,6 28,20 28,34 20,34 20,20' fill='url(#hullGrad)' stroke='antiquewhite' strokeWidth='1' filter='url(#shipGlow)' />

        {/* Nose cone */}
        <polygon points='24,6 26,12 22,12' fill='#4A4A4A' stroke='antiquewhite' strokeWidth='1' />

        {/* Cockpit */}
        <ellipse cx='24' cy='16' rx='3' ry='6' fill='url(#cockpitGrad)' stroke='antiquewhite' strokeWidth='0.5' />

        {/* Engine housings */}
        <rect x='16' y='32' width='4' height='6' fill='#556B2F' stroke='antiquewhite' strokeWidth='1' rx='2' />
        <rect x='28' y='32' width='4' height='6' fill='#556B2F' stroke='antiquewhite' strokeWidth='1' rx='2' />

        {/* Weapon mounts */}
        <circle cx='20' cy='24' r='1.5' fill='#FF6B35' stroke='antiquewhite' strokeWidth='0.5'>
            <animate attributeName='opacity' values='0.7;1;0.7' dur='2s' repeatCount='indefinite' />
        </circle>
        <circle cx='28' cy='24' r='1.5' fill='#FF6B35' stroke='antiquewhite' strokeWidth='0.5'>
            <animate attributeName='opacity' values='0.7;1;0.7' dur='2s' begin='1s' repeatCount='indefinite' />
        </circle>

        {/* Navigation lights */}
        <circle cx='8' cy='34' r='1' fill='#FF0000'>
            <animate attributeName='opacity' values='1;0.3;1' dur='1s' repeatCount='indefinite' />
        </circle>
        <circle cx='40' cy='34' r='1' fill='#00FF00'>
            <animate attributeName='opacity' values='0.3;1;0.3' dur='1.2s' repeatCount='indefinite' />
        </circle>

        {/* Hull details */}
        <rect x='22' y='14' width='4' height='1' fill='antiquewhite' opacity='0.7' />
        <rect x='22' y='18' width='4' height='1' fill='antiquewhite' opacity='0.7' />
        <rect x='22' y='22' width='4' height='1' fill='antiquewhite' opacity='0.7' />

        {/* Wingtip missiles */}
        <rect x='6' y='33' width='3' height='1.5' fill='#8B4513' rx='0.5' />
        <rect x='39' y='33' width='3' height='1.5' fill='#8B4513' rx='0.5' />

        {/* Central energy core */}
        <circle cx='24' cy='26' r='2' fill='#00BFFF' opacity='0.8'>
            <animate attributeName='opacity' values='0.5;1;0.5' dur='1.5s' repeatCount='indefinite' />
        </circle>
    </svg>
);

export default PlayerSpaceship;