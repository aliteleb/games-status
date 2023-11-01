import React, { useState, useEffect, useRef } from 'react';
import ApiClient from '../../services/ApiClient';
import GroupCard from '../layouts/GroupCard';
import BlurredBackground, {refreshPageSize} from "../core/BlurredBackground.jsx";


export default function Protections() {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nextPage, setNextPage] = useState(null);

    const loadGroups = (pageUrl) => {
        if (pageUrl) {
            setIsLoading(true);
            ApiClient().get(pageUrl)
                .then((res) => {
                    setGroups((prevGroups) => [...prevGroups, ...res.data.data.data]);
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
        loadGroups('/groups');
    }, []); // Load initial data

    const scrollListener = useRef(null);

    useEffect(() => {
        scrollListener.current = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            if (scrollPosition >= totalHeight && !isLoading && nextPage) {
                loadGroups(nextPage);
            }
        };

        window.addEventListener('scroll', scrollListener.current);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', scrollListener.current);
        };
    }, [nextPage, isLoading]);

    const showGroups = groups?.map((group, index) => (
        <GroupCard animate={true} info={group} key={index} />
    ));

    const placeholders = [];
    for (let i = 0; i < 12; i++) {
        placeholders.push(<GroupCard key={i}/>);
    }
    refreshPageSize()
    return (
        <>
            <div className="border-b border-gray-500/50 pb-2 text-xl">Groups</div>
            <div className="mt-3 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groups.length > 0 || placeholders}
                {showGroups}
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
