interface IProps {
    setAlienLocation: React.Dispatch<React.SetStateAction<number[]>>;
    // index: number;
    squareWidth: number;
    squareHeight: number;
    laserShots: number[];
    laserShotsRef: React.MutableRefObject<number | null>;
    hitAlienRef: React.MutableRefObject<number | null>;
}

export const useGameElements = ({
    setAlienLocation,
    // index,
    squareWidth,
    squareHeight,
    laserShots,
    laserShotsRef,
    hitAlienRef,
}: IProps) => {
    const createImpactElement = (index: number) => {
        /** When hit, replace alien location index value with -1 */
        setAlienLocation(prevState => {
            return prevState.map((alienIdx) => alienIdx === index ? -1 : alienIdx);
        });
        // Hit alien
        const laserIndex = laserShots?.indexOf(index);
        if (laserIndex > -1) {
            laserShotsRef.current = index;
        }

        hitAlienRef.current = index;
        return (
            <div
                key={'hitAlien' + index}
                style={{
                    width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    fontSize: '60px',
                }}
            >
                💥
            </div>
        );
    };

    const createLaserBlast = (index: number) => (
        <div key={'laser' + index} style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', background: 'transparent' }}>
            <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: '#39FF14',
            }}>{'|'}</span>
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
                {index}
                {/* 👾 */}
            </span>
        </div>
    );

    const createTheInfiniteVoidOfSpaceElement = (index: number) => (
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
    );

    return {
        createImpactElement,
        createLaserBlast,
        createAlienElement,
        createTheInfiniteVoidOfSpaceElement,
    };
};