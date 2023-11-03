import React, { useState, useEffect, useRef } from 'react';
import ApiClient from '../../services/ApiClient';
import ProtectionCard from '../layouts/ProtectionCard.jsx';
import BlurredBackground, {refreshPageSize} from "../core/BlurredBackground.jsx";


export default function Protections() {
    const [protections, setProtections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nextPage, setNextPage] = useState(null);

    const loadProtections = (pageUrl) => {
        if (pageUrl) {
            setIsLoading(true);
            ApiClient().get(pageUrl)
                .then((res) => {
                    setProtections((prevProtections) => [...prevProtections, ...res.data.data.data]);
                    setNextPage(res.data.data.next_page_url);
                    setIsLoading(false);
                    setTimeout(refreshPageSize, 50)
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('Failed to get the data', err);
                });
        }
    };

    useEffect(() => {
        loadProtections('/protections');
    }, []); // Load initial data

    const scrollListener = useRef(null);

    useEffect(() => {
        scrollListener.current = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            if (scrollPosition >= totalHeight && !isLoading && nextPage) {
                loadProtections(nextPage);
            }
        };

        window.addEventListener('scroll', scrollListener.current);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', scrollListener.current);
        };
    }, [nextPage, isLoading]);

    const showProtections = protections?.map((drm, index) => (
        <ProtectionCard animate={true} info={drm} key={index} />
    ));

    const placeholders = [];
    for (let i = 0; i < 12; i++) {
        placeholders.push(<ProtectionCard key={i}/>);
    }



    refreshPageSize()
    return (
        <>
            <header className="border-b-[1px] border-[#494a4f] pb-2 text-xl font-bold">Protections</header>
            <div className="mt-3 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {protections.length > 0 || placeholders}
                {showProtections}
            </div>
            <div className="p-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    className={`spinner_P7sC mx-auto ${isLoading ? '' : 'opacity-0'}`}
                    fill="#ddd"
                >
                    <path
                        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                        className="spinner_P7sC"
                    />
                </svg>
            </div>
        </>
    );
}
