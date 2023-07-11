import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';


export default function ScrollToTop() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const scrollPosition = document.documentElement.scrollTop;

            setShowContent(scrollPosition > headerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }} id='top' className={`btn btn--icon to-top ${showContent ? 'show' : ''}`} aria-label='Go back'><ArrowUp /></button>
    );
}