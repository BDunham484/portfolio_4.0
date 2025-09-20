const ExplosionEffect = () => (
    <svg
        width='48'
        height='48'
        viewBox='0 0 48 48'
        xmlns='http://www.w3.org/2000/svg'
    >
        <defs>
            {/* Explosion glow filter */}
            <filter id='explosionGlow'>
                <feGaussianBlur stdDeviation='3' result='coloredBlur' />
                <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                </feMerge>
            </filter>

            {/* Core explosion gradient */}
            <radialGradient id='coreExplosion' cx='50%' cy='50%' r='50%'>
                <stop offset='0%' style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                <stop offset='30%' style={{ stopColor: '#FFFF00', stopOpacity: 0.9 }} />
                <stop offset='60%' style={{ stopColor: '#FF6600', stopOpacity: 0.7 }} />
                <stop offset='100%' style={{ stopColor: '#FF0000', stopOpacity: 0.3 }} />
            </radialGradient>

            {/* Outer blast gradient */}
            <radialGradient id='outerBlast' cx='50%' cy='50%' r='70%'>
                <stop offset='0%' style={{ stopColor: '#FFAA00', stopOpacity: 0.6 }} />
                <stop offset='50%' style={{ stopColor: '#FF3300', stopOpacity: 0.4 }} />
                <stop offset='100%' style={{ stopColor: '#CC0000', stopOpacity: 0.1 }} />
            </radialGradient>
        </defs>

        {/* Outer blast wave */}
        <circle cx='24' cy='24' r='20' fill='url(#outerBlast)' filter='url(#explosionGlow)'>
            <animate attributeName='r' values='5;22;5' dur='0.6s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='0.8;0.2;0.8' dur='0.6s' repeatCount='indefinite' />
        </circle>

        {/* Main explosion core */}
        <circle cx='24' cy='24' r='12' fill='url(#coreExplosion)'>
            <animate attributeName='r' values='3;15;3' dur='0.5s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='1;0.3;1' dur='0.5s' repeatCount='indefinite' />
        </circle>

        {/* Hot center */}
        <circle cx='24' cy='24' r='6' fill='#FFFFFF'>
            <animate attributeName='r' values='2;8;2' dur='0.4s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='1;0.4;1' dur='0.4s' repeatCount='indefinite' />
        </circle>

        {/* Explosion particles/debris */}
        <circle cx='12' cy='12' r='2' fill='#FF6600'>
            <animate attributeName='opacity' values='1;0;1' dur='0.8s' repeatCount='indefinite' />
            <animateTransform attributeName='transform' type='translate' values='12,12; 8,8; 12,12' dur='0.8s' repeatCount='indefinite' />
        </circle>
        <circle cx='36' cy='12' r='2' fill='#FFAA00'>
            <animate attributeName='opacity' values='1;0;1' dur='0.7s' repeatCount='indefinite' />
            <animateTransform attributeName='transform' type='translate' values='0,0; 4,-4; 0,0' dur='0.7s' repeatCount='indefinite' />
        </circle>
        <circle cx='12' cy='36' r='2' fill='#FF3300'>
            <animate attributeName='opacity' values='1;0;1' dur='0.9s' repeatCount='indefinite' />
            <animateTransform attributeName='transform' type='translate' values='0,0; -4,4; 0,0' dur='0.9s' repeatCount='indefinite' />
        </circle>
        <circle cx='36' cy='36' r='2' fill='#FF9900'>
            <animate attributeName='opacity' values='1;0;1' dur='0.6s' repeatCount='indefinite' />
            <animateTransform attributeName='transform' type='translate' values='0,0; 4,4; 0,0' dur='0.6s' repeatCount='indefinite' />
        </circle>

        {/* Energy sparks */}
        <rect x='22' y='8' width='4' height='2' fill='#FFFF00' rx='1'>
            <animate attributeName='opacity' values='1;0;1' dur='0.3s' repeatCount='indefinite' />
            <animateTransform attributeName='transform' type='translate' values='0,0; 0,-6; 0,0' dur='0.5s' repeatCount='indefinite' />
        </rect>
        <rect x='38' y='22' width='2' height='4' fill='#FFFF00' rx='1'>
            <animate attributeName='opacity' values='1;0;1' dur='0.4s' repeatCount='indefinite' />
            <animateTransform attributeName='transform' type='translate' values='0,0; 6,0; 0,0' dur='0.6s' repeatCount='indefinite' />
        </rect>
        <rect x='22' y='38' width='4' height='2' fill='#FFFF00' rx='1'>
            <animate attributeName='opacity' values='1;0;1' dur='0.35s' repeatCount='indefinite' />
            <animateTransform attributeName='transform' type='translate' values='0,0; 0,6; 0,0' dur='0.5s' repeatCount='indefinite' />
        </rect>
        <rect x='8' y='22' width='2' height='4' fill='#FFFF00' rx='1'>
            <animate attributeName='opacity' values='1;0;1' dur='0.45s' repeatCount='indefinite' />
            <animateTransform attributeName='transform' type='translate' values='0,0; -6,0; 0,0' dur='0.7s' repeatCount='indefinite' />
        </rect>

        {/* Secondary blast rings */}
        <circle cx='24' cy='24' r='16' fill='none' stroke='#FF6600' strokeWidth='2' opacity='0.5'>
            <animate attributeName='r' values='8;18;8' dur='0.7s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='0.7;0.1;0.7' dur='0.7s' repeatCount='indefinite' />
        </circle>
    </svg>
);

export default ExplosionEffect;