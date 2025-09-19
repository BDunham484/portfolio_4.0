const NodeJsInvader = () => (
    <svg
        width='48'
        height='48'
        viewBox='0 0 48 48'
        xmlns='http://www.w3.org/2000/svg'
    >
        <defs>
            {/* Glow effects */}
            <filter id='greenGlow'>
                <feGaussianBlur stdDeviation='2' result='coloredBlur' />
                <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                </feMerge>
            </filter>

            {/* Animated gradient for hexagon core */}
            <radialGradient id='hexGrad' cx='50%' cy='50%' r='60%'>
                <stop offset='0%' style={{ stopColor: '#8CC84B', stopOpacity: 1 }}>
                    <animate attributeName='stop-color' values='#8CC84B;#68A063;#3C873A;#68A063;#8CC84B' dur='3s' repeatCount='indefinite' />
                </stop>
                <stop offset='100%' style={{ stopColor: '#3C873A', stopOpacity: 1 }}>
                    <animate attributeName='stop-color' values='#3C873A;#2D5016;#1A3009;#2D5016;#3C873A' dur='3s' repeatCount='indefinite' />
                </stop>
            </radialGradient>
        </defs>

        {/* Delta wings - attached at separate hexagon points */}
        <polygon points='16,18 6,28 10,32 18,26' fill='#556B2F' opacity='0.9' />
        <polygon points='32,18 42,28 38,32 30,26' fill='#556B2F' opacity='0.9' />

        {/* Wing details */}
        <polygon points='16,20 10,26 12,28 18,24' fill='#68A063' opacity='0.7' />
        <polygon points='32,20 38,26 36,28 30,24' fill='#68A063' opacity='0.7' />

        {/* Main Node.js hexagon - much larger */}
        <polygon points='24,6 34,12 34,24 24,30 14,24 14,12' fill='url(#hexGrad)' stroke='#2D5016' strokeWidth='1.5' filter='url(#greenGlow)' />

        {/* Stylized "N" shape inside hexagon - bigger and flipped */}
        <polygon points='18,13 20,13 20,21 26,13 28,13 28,23 26,23 26,15 20,23 18,23' fill='#FFFFFF' opacity='0.9'>
            <animate attributeName='opacity' values='0.7;1;0.7' dur='2s' repeatCount='indefinite' />
        </polygon>

        {/* Small hexagon border accent */}
        <polygon points='24,6 34,12 34,24 24,30 14,24 14,12' fill='none' stroke='#8CC84B' strokeWidth='0.5' opacity='0.6'>
            <animate attributeName='opacity' values='0.3;0.8;0.3' dur='4s' repeatCount='indefinite' />
        </polygon>

        {/* Wing tip navigation lights */}
        <circle cx='8' cy='30' r='1.5' fill='#FF4444'>
            <animate attributeName='opacity' values='1;0.3;1' dur='1.5s' repeatCount='indefinite' />
        </circle>
        <circle cx='40' cy='30' r='1.5' fill='#44FF44'>
            <animate attributeName='opacity' values='0.3;1;0.3' dur='2s' repeatCount='indefinite' />
        </circle>

        {/* Small engine vents - minimal */}
        <rect x='22' y='30' width='4' height='2' fill='#68A063' opacity='0.6' rx='1'>
            <animate attributeName='opacity' values='0.4;0.8;0.4' dur='2.5s' repeatCount='indefinite' />
        </rect>
    </svg>
);

export default NodeJsInvader;