import { useEffect, type ReactNode } from 'react';
import { useAppDispatch } from '../store/hooks';


export default function InitializationHandler({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initializeApplication = async () => {
            try {
                // await dispatch(fetchAllProjects()).unwrap();
            } catch (error) {
                console.error('Failed to initialize applicaation:', error);
            }
        };

        initializeApplication();
    }, [dispatch]);

    return children;
}
