
import ExplosionEffect from '../Explosion';
import InvaderLaser from '../InvaderLaser';
import LaserBlast from '../LaserBlast';

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
                {index}
                {/* <NodeJsInvader /> */}
                {/* <JavaScriptInvader /> */}
                {/* <ReactInvader /> */}
                {/* // changelog-end  */}
            </span>
        </div>
    );

    const createTheInfiniteVoidOfSpaceElement = (index: number) => (
        // changelog-start **showIndexes**
        <div
            key={'empty' + index}
            style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', color: 'teal' }}
        >
            {index}
        </div>
        // <div
        //     key={'empty' + index}
        //     style={{
        //         width: squareWidth,
        //         height: squareHeight,
        //         margin: 0,
        //         padding: 0,
        //         boxSizing: 'border-box',
        //     }}
        // />
        // changelog-end
    );

    return {
        createImpactElement,
        createLaserBlast,
        createInvaderLaserBlast,
        createAlienElement,
        createTheInfiniteVoidOfSpaceElement,
    };
};