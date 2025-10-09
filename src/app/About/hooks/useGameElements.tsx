
import ExplosionEffect from '../Explosion';
import InvaderLaser from '../InvaderLaser';
import LaserBlast from '../LaserBlast';
import ReactInvader from '../ReactInvader';
import MovieXWingFighter from '../XWing';

interface IProps {
    setAlienLocation: React.Dispatch<React.SetStateAction<number[]>>;
    // index: number;
    squareWidth: number;
    squareHeight: number;
    laserBlasts: number[];
    laserShotsRef: React.MutableRefObject<number | null>;
    hitAlienRef: React.MutableRefObject<number | null>;
}

export const useGameElements = ({
    setAlienLocation,
    // index,
    squareWidth,
    squareHeight,
    laserBlasts,
    laserShotsRef,
    hitAlienRef,
}: IProps) => {
    const createImpactElement = (index: number) => {
        /** When hit, replace alien location index value with -1 */
        // setAlienLocation(prevState => {
        //     return prevState.map((alienIdx) => alienIdx === index ? -1 : alienIdx);
        // });
        // Hit alien
        // const laserIndex = laserBlasts?.indexOf(index);
        // if (laserIndex > -1) {
        //     laserShotsRef.current = index;
        // }

        hitAlienRef.current = index;
        return (
            // changelog-start
            <div
                key={'hitAlien' + index}
                style={{
                    width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    fontSize: '60px',
                }}
            >
                <ExplosionEffect />
            </div>
            // <div
            //     key={'hitAlien' + index}
            //     style={{
            //         width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex',
            //         alignItems: 'flex-start',
            //         justifyContent: 'center',
            //         fontSize: '60px',
            //     }}
            // >
            //     💥
            // </div>
            // changelog-end
        );
    };

    const createLaserBlast = (index: number) => (
        <div
            key={'laser' + index}
            style={{
                // width: squareWidth,
                // height: squareHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                background: 'transparent',
            }}>
            {/* // changelog-start */}
            <LaserBlast />
            {/* <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: '#39FF14',
            }}>{'|'}</span> */}
            {/* // changelog-end */}
        </div>
    );

    const createInvaderLaserBlast = (index: number) => (
        <div
            key={'laser' + index}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                background: 'transparent',
            }}>
            <InvaderLaser />
            {/* <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: '#39FF14',
            }}>{'|'}</span> */}
        </div>
    );

    const createAlienElement = (index: number) => (
        <div
            key={'alien' + index}
            style={{
                width: squareWidth,
                height: squareHeight,
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            }}
        // onClick={() => setDeadAliens((prev) => [...prev, index])}
        >
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                }}
            >
                {/* // changelog-start */}
                {/* {index} */}
                {/* <NodeJsInvader /> */}
                {/* <JavaScriptInvader /> */}
                <ReactInvader />
                {/* // changelog-end  */}
            </span>
        </div>
    );

    const createTheInfiniteVoidOfSpaceElement = (index: number) => (
        // changelog-start **showIndexes**
        // <div
        //     key={'empty' + index}
        //     style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', color: 'teal' }}
        // >
        //     {index}
        // </div>
        <div
            key={'empty' + index}
            style={{
                width: squareWidth,
                height: squareHeight,
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            }}
        />
        // changelog-end
    );

    const blowEmUp = (index: number) => {
        // Generate random positions for 8-12 explosions
        const explosionCount = Math.floor(Math.random() * 5) + 8; // 8-12 explosions
        const explosions = Array.from({ length: explosionCount }, (_, i) => {
            // Random position that extends slightly beyond the square bounds
            const offsetX = (Math.random() - 0.5) * squareWidth * 1.4;
            const offsetY = (Math.random() - 0.5) * squareHeight * 1.4;
            // Start explosions immediately with staggered starts
            const startDelay = Math.random() * 0.5;
            // After ship disappears (0.8s), wait 2s, then start tapering
            const taperDelay = 2.8 + (i * 0.15);

            return (
                <div
                    key={`explosion-${i}`}
                    style={{
                        position: 'absolute',
                        left: `calc(50% + ${offsetX}px)`,
                        top: `calc(50% + ${offsetY}px)`,
                        transform: 'translate(-50%, -50%)',
                        animation: `explosionAppear 0.3s ease-out ${startDelay}s forwards, explosionTaper 0.8s ease-out ${taperDelay}s forwards`,
                        pointerEvents: 'none',
                    }}
                >
                    <ExplosionEffect />
                </div>
            );
        });

        return (
            <div
                key={'playerDestroyed' + index}
                style={{
                    width: squareWidth,
                    height: squareHeight,
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {/* Flickering X-Wing that fades out */}
                <div
                    style={{
                        animation: 'playerFlicker 0.8s ease-out forwards',
                        transform: 'scale(1.2)',
                    }}
                >
                    <MovieXWingFighter />
                </div>
                {/* Multiple explosions */}
                {explosions}
                <style>{`
                    @keyframes playerFlicker {
                        0% { opacity: 1; }
                        10% { opacity: 0.3; }
                        20% { opacity: 0.9; }
                        30% { opacity: 0.2; }
                        40% { opacity: 0.8; }
                        50% { opacity: 0.1; }
                        60% { opacity: 0.7; }
                        70% { opacity: 0.3; }
                        80% { opacity: 0.5; }
                        90% { opacity: 0.2; }
                        100% { opacity: 0; }
                    }
                    @keyframes explosionAppear {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                    @keyframes explosionTaper {
                        0% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                `}</style>
            </div>
        );
    };

    return {
        createImpactElement,
        createLaserBlast,
        createInvaderLaserBlast,
        createAlienElement,
        createTheInfiniteVoidOfSpaceElement,
        blowEmUp,
    };
};