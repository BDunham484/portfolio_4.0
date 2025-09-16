const JavaScriptInvader = () => (
    <svg
        width='48'
        height='48'
        viewBox='0 0 48 48'
        xmlns='http://www.w3.org/2000/svg'
    >
        <defs>
            {/* Glow effects */}
            <filter id='logoGlow'>
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

            {/* Gradients */}
            <radialGradient id='engineGrad' cx='50%' cy='0%' r='100%'>
                <stop offset='0%' style={{ stopColor: '#00BFFF', stopOpacity: 0.8 }} />
                <stop offset='50%' style={{ stopColor: '#87CEEB', stopOpacity: 0.4 }} />
                <stop offset='100%' style={{ stopColor: '#E6F3FF', stopOpacity: 0.1 }} />
            </radialGradient>
        </defs>

        {/* Engine exhaust glow */}
        <ellipse cx='24' cy='38' rx='12' ry='8' fill='url(#engineGrad)' opacity='0.7' filter='url(#engineGlow)'>
            <animate attributeName='opacity' values='0.4;0.8;0.4' dur='2s' repeatCount='indefinite' />
            <animate attributeName='ry' values='8;10;8' dur='2s' repeatCount='indefinite' />
        </ellipse>
        <ellipse cx='24' cy='36' rx='8' ry='5' fill='url(#engineGrad)' opacity='0.9'>
            <animate attributeName='opacity' values='0.6;1;0.6' dur='1.5s' repeatCount='indefinite' />
        </ellipse>

        {/* Wings */}
        <polygon points='8,20 18,18 18,26 10,28' fill='#B8860B' opacity='0.9' />
        <polygon points='40,20 30,18 30,26 38,28' fill='#B8860B' opacity='0.9' />

        {/* Wing lights */}
        <circle cx='6' cy='22' r='2' fill='#FF4444'>
            <animate attributeName='opacity' values='1;0.3;1' dur='1.2s' repeatCount='indefinite' />
        </circle>
        <circle cx='42' cy='22' r='2' fill='#44FF44'>
            <animate attributeName='opacity' values='0.3;1;0.3' dur='1.5s' repeatCount='indefinite' />
        </circle>

        {/* JavaScript logo pentagon shield background */}
        <polygon points='16,10 32,10 30,22 24,26 18,22' fill='#F7DF1E' filter='url(#logoGlow)' />

        {/* Large J with glow */}
        <text x='20' y='21' fontFamily='Arial, sans-serif' fontSize='10' fontWeight='bold' fill='#323330'>
            J
            <animate attributeName='fill' values='#323330;#FF6B35;#323330' dur='3s' repeatCount='indefinite' />
        </text>

        {/* Large S with glow */}
        <text x='26' y='21' fontFamily='Arial, sans-serif' fontSize='10' fontWeight='bold' fill='#323330'>
            S
            <animate attributeName='fill' values='#323330;#FF6B35;#323330' dur='3s' begin='1.5s' repeatCount='indefinite' />
        </text>

        {/* Logo border glow */}
        <polygon points='16,10 32,10 30,22 24,26 18,22' fill='none' stroke='#FFE135' strokeWidth='1' opacity='0.8'>
            <animate attributeName='opacity' values='0.5;1;0.5' dur='4s' repeatCount='indefinite' />
        </polygon>

        {/* Small engine details */}
        <rect x='20' y='26' width='2' height='4' fill='#87CEEB' opacity='0.6' rx='1'>
            <animate attributeName='opacity' values='0.4;0.8;0.4' dur='1.8s' repeatCount='indefinite' />
        </rect>
        <rect x='26' y='26' width='2' height='4' fill='#87CEEB' opacity='0.6' rx='1'>
            <animate attributeName='opacity' values='0.8;0.4;0.8' dur='1.8s' repeatCount='indefinite' />
        </rect>
    </svg>

);

export default JavaScriptInvader;