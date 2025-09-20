const LaserBlast = () => (
    <svg
        width='48'
        height='48'
        viewBox='0 0 48 48'
        xmlns='http://www.w3.org/2000/svg'
    >
        <defs>
            {/* Glow effect for laser */}
            <filter id='laserGlow'>
                <feGaussianBlur stdDeviation='2' result='coloredBlur' />
                <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                </feMerge>
            </filter>

            {/* Laser gradient */}
            <linearGradient id='laserGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                <stop offset='20%' style={{ stopColor: '#39FF14', stopOpacity: 1 }} />
                <stop offset='80%' style={{ stopColor: '#39FF14', stopOpacity: 1 }} />
                <stop offset='100%' style={{ stopColor: '#00CC00', stopOpacity: 0.8 }} />
            </linearGradient>

            {/* Energy core gradient */}
            <linearGradient id='coreGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#FFFFFF', stopOpacity: 0.9 }} />
                <stop offset='50%' style={{ stopColor: '#CCFFCC', stopOpacity: 0.7 }} />
                <stop offset='100%' style={{ stopColor: '#39FF14', stopOpacity: 0.5 }} />
            </linearGradient>
        </defs>

        {/* Outer glow/energy field */}
        <rect x='20' y='4' width='8' height='40' fill='#39FF14' opacity='0.3' rx='4' filter='url(#laserGlow)' />

        {/* Main laser beam */}
        <rect x='22' y='6' width='4' height='36' fill='url(#laserGrad)' rx='2' />

        {/* Bright energy core */}
        <rect x='23' y='8' width='2' height='32' fill='url(#coreGrad)' rx='1' />

        {/* Leading tip effect */}
        <ellipse cx='24' cy='6' rx='3' ry='2' fill='#FFFFFF' opacity='0.8' />
        <ellipse cx='24' cy='6' rx='1.5' ry='1' fill='#FFFFFF' />

        {/* Trailing energy particles */}
        <circle cx='24' cy='42' r='1.5' fill='#39FF14' opacity='0.6'>
            <animate attributeName='opacity' values='0.3;0.8;0.3' dur='0.5s' repeatCount='indefinite' />
        </circle>
        <circle cx='22' cy='40' r='1' fill='#39FF14' opacity='0.4'>
            <animate attributeName='opacity' values='0.2;0.6;0.2' dur='0.7s' repeatCount='indefinite' />
        </circle>
        <circle cx='26' cy='40' r='1' fill='#39FF14' opacity='0.4'>
            <animate attributeName='opacity' values='0.2;0.6;0.2' dur='0.6s' repeatCount='indefinite' />
        </circle>
    </svg>
);

export default LaserBlast;