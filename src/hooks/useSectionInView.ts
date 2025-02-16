// src/hooks/useSectionInView.ts
import { useInView } from 'react-intersection-observer';

export const useSectionInView = (threshold = 0.5) => {
    const { ref, inView } = useInView({
        threshold,
    });
    return { ref, inView };
};
