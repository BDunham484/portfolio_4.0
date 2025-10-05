const MovieXWingFighter = () => (
    <svg
        width='96'
        height='96'
        viewBox='0 0 1024 1536'
        xmlns='http://www.w3.org/2000/svg'
    >
        <defs>
            {/* Glow effects */}
            <filter id='engineGlow'>
                <feGaussianBlur stdDeviation='8' result='coloredBlur' />
                <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                </feMerge>
            </filter>
            <filter id='shipGlow'>
                <feGaussianBlur stdDeviation='3' result='coloredBlur' />
                <feMerge>
                    <feMergeNode in='coloredBlur' />
                    <feMergeNode in='SourceGraphic' />
                </feMerge>
            </filter>

            {/* Engine gradient */}
            <radialGradient id='engineGrad' cx='50%' cy='50%' r='60%'>
                <stop offset='0%' style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                <stop offset='30%' style={{ stopColor: '#FF6347', stopOpacity: 0.9 }} />
                <stop offset='100%' style={{ stopColor: '#FF4500', stopOpacity: 0.3 }} />
            </radialGradient>

            {/* Hull gradient */}
            <linearGradient id='hullGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' style={{ stopColor: '#F0F0F0', stopOpacity: 1 }} />
                <stop offset='50%' style={{ stopColor: '#D8D8D8', stopOpacity: 1 }} />
                <stop offset='100%' style={{ stopColor: '#C0C0C0', stopOpacity: 1 }} />
            </linearGradient>
        </defs>

        {/* Engine exhaust effects - bigger and more noticeable */}
        <ellipse cx='113' cy='950' rx='35' ry='60' fill='url(#engineGrad)' opacity='0.8' filter='url(#engineGlow)'>
            <animate attributeName='ry' values='60;75;60' dur='0.4s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='0.6;1;0.6' dur='0.4s' repeatCount='indefinite' />
        </ellipse>
        <ellipse cx='462' cy='1020' rx='35' ry='60' fill='url(#engineGrad)' opacity='0.8' filter='url(#engineGlow)'>
            <animate attributeName='ry' values='60;75;60' dur='0.4s' begin='0.1s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='0.6;1;0.6' dur='0.4s' begin='0.1s' repeatCount='indefinite' />
        </ellipse>
        <ellipse cx='562' cy='1020' rx='35' ry='60' fill='url(#engineGrad)' opacity='0.8' filter='url(#engineGlow)'>
            <animate attributeName='ry' values='60;75;60' dur='0.4s' begin='0.2s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='0.6;1;0.6' dur='0.4s' begin='0.2s' repeatCount='indefinite' />
        </ellipse>
        <ellipse cx='910' cy='950' rx='35' ry='60' fill='url(#engineGrad)' opacity='0.8' filter='url(#engineGlow)'>
            <animate attributeName='ry' values='60;75;60' dur='0.4s' begin='0.3s' repeatCount='indefinite' />
            <animate attributeName='opacity' values='0.6;1;0.6' dur='0.4s' begin='0.3s' repeatCount='indefinite' />
        </ellipse>

        {/* Main hull structure */}
        <g fill='url(#hullGrad)' stroke='#808080' strokeWidth='2' filter='url(#shipGlow)'>
            <path d='M661.00,1112.50 L628.00,1112.50 L620.00,1110.50 L610.00,1105.50 L602.50,1097.00 L601.50,1038.00 L604.50,1029.00 L609.50,1023.00 L607.50,1016.00 L608.50,948.00 L598.00,945.50 L594.00,939.50 L583.50,958.00 L563.50,1003.00 L558.00,1006.50 L462.00,1006.50 L456.50,1002.00 L447.50,979.00 L428.50,941.00 L427.00,940.50 L421.00,946.50 L414.00,946.50 L413.50,1017.00 L411.50,1023.00 L416.50,1028.00 L419.50,1037.00 L419.50,1095.00 L411.00,1105.50 L398.00,1111.50 L360.00,1112.50 L342.00,1105.50 L336.50,1100.00 L333.50,1093.00 L333.50,1039.00 L335.50,1031.00 L341.50,1023.00 L339.50,1015.00 L340.50,948.00 L330.00,945.50 L326.50,942.00 L324.00,934.50 L149.00,891.50 L146.50,903.00 L139.50,910.00 L139.50,936.00 L136.00,940.50 L91.00,941.50 L86.50,937.00 L86.50,910.00 L79.50,904.00 L77.50,899.00 L78.50,736.00 L86.50,727.00 L86.50,711.00 L94.50,701.00 L94.50,626.00 L96.50,621.00 L104.50,615.00 L105.50,422.00 L97.50,413.00 L97.50,378.00 L101.00,373.50 L105.50,372.00 L106.50,367.00 L106.50,320.00 L109.00,316.50 L116.00,315.50 L119.50,319.00 L120.50,372.00 L126.00,373.50 L129.50,378.00 L129.50,413.00 L128.50,416.00 L121.50,422.00 L122.50,615.00 L130.50,621.00 L132.50,626.00 L132.50,704.00 L139.50,710.00 L139.50,728.00 L147.50,736.00 L149.00,747.50 L316.00,721.50 L329.50,710.00 L331.50,691.00 L336.00,686.50 L345.00,683.50 L412.00,684.50 L417.00,686.50 L422.50,693.00 L424.50,710.00 L425.50,640.00 L433.50,574.00 L448.50,409.00 L460.50,311.00 L460.50,302.00 L455.50,293.00 L455.50,281.00 L467.50,209.00 L477.50,174.00 L484.00,167.50 L536.00,167.50 L540.00,169.50 L544.50,177.00 L553.50,215.00 L564.50,281.00 L564.50,294.00 L560.50,302.00 L560.50,313.00 L568.50,375.00 L584.50,545.00 L595.50,637.00 L597.50,710.00 L600.50,692.00 L607.00,685.50 L614.00,683.50 L677.00,683.50 L685.00,686.50 L689.50,691.00 L691.50,710.00 L705.00,721.50 L873.00,747.50 L874.50,735.00 L881.50,728.00 L881.50,712.00 L883.50,708.00 L889.50,704.00 L889.50,625.00 L891.50,621.00 L899.50,615.00 L900.50,422.00 L892.50,413.00 L892.50,378.00 L896.00,373.50 L901.50,372.00 L901.50,320.00 L906.00,315.50 L911.00,315.50 L914.50,319.00 L915.50,372.00 L921.00,373.50 L924.50,379.00 L924.50,413.00 L923.50,416.00 L916.50,422.00 L917.50,615.00 L926.50,623.00 L927.50,626.00 L927.50,703.00 L934.50,709.00 L935.50,728.00 L943.50,737.00 L943.50,901.00 L940.50,906.00 L935.50,909.00 L935.50,934.00 L933.50,939.00 L930.00,941.50 L885.00,940.50 L881.50,936.00 L881.50,909.00 L874.50,902.00 L873.50,892.00 L872.00,891.50 L698.00,934.50 L692.00,944.50 L680.50,947.00 L681.50,1015.00 L679.50,1023.00 L684.50,1029.00 L687.50,1038.00 L687.50,1093.00 L684.50,1100.00 L679.00,1105.50 L661.00,1112.50 Z' />
        </g>

        {/* Detailed components with colors */}
        <g fill='#606060' stroke='#404040' strokeWidth='1'>
            <path d='M546.50,257.00 L530.50,183.00 L491.00,182.50 L488.50,187.00 L474.50,257.00 L546.50,257.00 Z' />
            <path d='M458.50,667.00 L454.50,645.00 L454.50,570.00 L468.50,520.00 L473.50,495.00 L486.00,273.50 L472.50,274.00 L471.50,290.00 L475.50,298.00 L474.50,328.00 L454.50,502.00 L445.50,611.00 L441.50,634.00 L440.50,666.00 L442.00,667.50 L458.50,667.00 Z' />
            <path d='M535.50,465.00 L536.50,455.00 L523.50,274.00 L498.00,273.50 L495.50,286.00 L485.50,464.00 L487.00,465.50 L535.50,465.00 Z' />
            <path d='M580.50,667.00 L579.50,634.00 L575.50,610.00 L563.50,477.00 L544.50,312.00 L544.50,300.00 L548.50,293.00 L548.50,274.00 L534.00,273.50 L549.50,508.00 L566.50,570.00 L566.50,638.00 L562.50,667.00 L580.50,667.00 Z' />
        </g>

        {/* Cockpit */}
        <g fill='#4682B4' opacity='0.6' stroke='#336699' strokeWidth='1'>
            <path d='M540.50,676.00 L549.50,666.00 L550.50,661.00 L545.50,633.00 L538.50,548.00 L534.50,523.00 L536.50,514.00 L486.00,513.50 L487.50,522.00 L476.50,626.00 L471.50,654.00 L471.50,665.00 L482.00,676.50 L540.50,676.00 Z' />
            <path d='M536.00,633.50 L486.00,633.50 L484.50,632.00 L495.00,521.50 L526.00,521.50 L527.50,523.00 L537.50,621.00 L537.50,632.00 L536.00,633.50 Z' />
        </g>

        {/* R2 astromech compartment */}
        <rect x='477' y='716.5' width='68.5' height='122.5' fill='#4169E1' stroke='#2E4BC7' strokeWidth='2' rx='10' />
        <circle cx='511' cy='778' r='8' fill='#FF0000'>
            <animate attributeName='opacity' values='1;0.3;1' dur='2s' repeatCount='indefinite' />
        </circle>
        <circle cx='492' cy='798' r='4' fill='#FFFF00'>
            <animate attributeName='opacity' values='0.5;1;0.5' dur='1.5s' repeatCount='indefinite' />
        </circle>
        <circle cx='530' cy='798' r='4' fill='#00FF00'>
            <animate attributeName='opacity' values='0.5;1;0.5' dur='1.8s' repeatCount='indefinite' />
        </circle>

        {/* Engine nacelles */}
        <g fill='#505050' stroke='#303030' strokeWidth='2'>
            <ellipse cx='113' cy='520' rx='25' ry='60' />
            <ellipse cx='910' cy='520' rx='25' ry='60' />
            <ellipse cx='113' cy='850' rx='25' ry='60' />
            <ellipse cx='910' cy='850' rx='25' ry='60' />
        </g>

        {/* Laser cannons */}
        <circle cx='113' cy='520' r='12' fill='#2F2F2F' />
        <circle cx='910' cy='520' r='12' fill='#2F2F2F' />
        <circle cx='113' cy='850' r='12' fill='#2F2F2F' />
        <circle cx='910' cy='850' r='12' fill='#2F2F2F' />

        {/* Engine glow effects */}
        <circle cx='113' cy='520' r='20' fill='#FF6347' opacity='0.4' />
        <circle cx='910' cy='520' r='20' fill='#FF6347' opacity='0.4' />
        <circle cx='113' cy='850' r='20' fill='#FF6347' opacity='0.4' />
        <circle cx='910' cy='850' r='20' fill='#FF6347' opacity='0.4' />

        {/* Navigation lights */}
        <circle cx='95' cy='500' r='8' fill='#FF0000'>
            <animate attributeName='opacity' values='1;0.2;1' dur='1.2s' repeatCount='indefinite' />
        </circle>
        <circle cx='928' cy='500' r='8' fill='#00FF00'>
            <animate attributeName='opacity' values='0.2;1;0.2' dur='1.5s' repeatCount='indefinite' />
        </circle>
        <circle cx='95' cy='870' r='8' fill='#FF0000'>
            <animate attributeName='opacity' values='1;0.2;1' dur='1.3s' repeatCount='indefinite' />
        </circle>
        <circle cx='928' cy='870' r='8' fill='#00FF00'>
            <animate attributeName='opacity' values='0.2;1;0.2' dur='1.4s' repeatCount='indefinite' />
        </circle>

        {/* Wing details and markings */}
        <g fill='#DC143C'>
            <rect x='300' y='750' width='80' height='8' />
            <rect x='644' y='750' width='80' height='8' />
            <rect x='300' y='800' width='80' height='8' />
            <rect x='644' y='800' width='80' height='8' />
        </g>

        {/* Detailed hull components from original SVG */}
        <g fill='#A0A0A0' stroke='#707070' strokeWidth='1'>
            <path d='M116.50,405.00 L116.50,389.00 L111.00,388.50 L110.50,405.00 L116.50,405.00 Z' />
            <path d='M911.50,405.00 L911.50,389.00 L906.00,388.50 L905.50,405.00 L911.50,405.00 Z' />
            <path d='M528.50,499.00 L537.50,498.00 L537.00,477.50 L483.50,478.00 L485.00,498.50 L528.50,499.00 Z' />
            <path d='M540.00,670.50 L482.00,670.50 L476.50,665.00 L481.50,643.00 L483.00,641.50 L539.00,641.50 L544.50,665.00 L540.00,670.50 Z' />
        </g>

    </svg>
);

export default MovieXWingFighter;