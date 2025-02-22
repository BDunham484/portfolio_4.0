import { useRouter } from 'next/navigation';

export const useDelayedNavigation = (delay: number = 600) => {
    const router = useRouter();

    const navigate = (targetRoute: string) => {
        setTimeout(() => {
            router.push(targetRoute);
        }, delay);
    };

    return navigate;
};
