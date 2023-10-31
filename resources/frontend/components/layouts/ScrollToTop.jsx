import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {refreshPageSize} from "../core/BlurredBackground.jsx";

function ScrollToTop() {
    const location = useLocation();

    refreshPageSize()
    setTimeout(refreshPageSize, 0)

    useEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scrollTo(0, 0);
    }, [location]);

    return null; // This component doesn't render anything
}

export default ScrollToTop;
