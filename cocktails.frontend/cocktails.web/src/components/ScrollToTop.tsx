import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface ScrollToTopProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};

export default ScrollToTop;
