const InvaderLaser = () => (
    <svg
        width='48'
        height='48'
        viewBox='0 0 48 48'
        xmlns='http://www.w3.org/2000/svg'
    >
        <defs>
            {/* Glow effect for enemy laser */}
            <filter id='enemyLaserGlow'>
                <feGaussianBlur stdDeviation='2' result='coloredBlur' />
                <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                </feMerge>
            </filter>

            {/* Enemy laser gradient */}
            <linearGradient id='enemyLaserGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#8B0000', stopOpacity: 0.8 }} />
                <stop offset='20%' style={{ stopColor: '#DC143C', stopOpacity: 1 }} />
                <stop offset='80%' style={{ stopColor: '#B22222', stopOpacity: 1 }} />
                <stop offset='100%' style={{ stopColor: '#FF6347', stopOpacity: 1 }} />
            </linearGradient>

            {/* Enemy energy core gradient */}
            <linearGradient id='enemyCoreGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#8B0000', stopOpacity: 0.5 }} />
                <stop offset='50%' style={{ stopColor: '#FF4500', stopOpacity: 0.8 }} />
                <stop offset='100%' style={{ stopColor: '#DC143C', stopOpacity: 0.9 }} />
            </linearGradient>
        </defs>

        {/* Outer glow/energy field */}
        <rect x='20' y='4' width='8' height='40' fill='#8B0000' opacity='0.4' rx='4' filter='url(#enemyLaserGlow)' />

        {/* Main laser beam */}
        <rect x='22' y='6' width='4' height='36' fill='url(#enemyLaserGrad)' rx='2' />

        {/* Bright energy core */}
        <rect x='23' y='8' width='2' height='32' fill='url(#enemyCoreGrad)' rx='1' />

        {/* Leading tip effect - pointing downward */}
        <ellipse cx='24' cy='42' rx='3' ry='2' fill='#FF4500' opacity='0.9' />
        <ellipse cx='24' cy='42' rx='1.5' ry='1' fill='#FF6347' />

        {/* Trailing energy particles */}
        <circle cx='24' cy='6' r='1.5' fill='#8B0000' opacity='0.6'>
            <animate attributeName='opacity' values='0.3;0.8;0.3' dur='0.6s' repeatCount='indefinite' />
        </circle>
        <circle cx='22' cy='8' r='1' fill='#B22222' opacity='0.5'>
            <animate attributeName='opacity' values='0.2;0.6;0.2' dur='0.8s' repeatCount='indefinite' />
        </circle>
        <circle cx='26' cy='8' r='1' fill='#B22222' opacity='0.5'>
            <animate attributeName='opacity' values='0.2;0.6;0.2' dur='0.7s' repeatCount='indefinite' />
        </circle>
    </svg>
);

export default InvaderLaser;