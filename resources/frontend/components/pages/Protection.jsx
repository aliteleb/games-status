import React from 'react';
import {useParams} from 'react-router-dom';
import GameCard from '../layouts/GameCard';
import ApiClient from '../../services/ApiClient'
import Skeleton from "react-loading-skeleton";
import BlurredBackground, {refreshPageSize} from "../core/BlurredBackground.jsx";

const Protection = () => {

    const {slug} = useParams()

    const [games, setGames] = React.useState([])
    const [response, setResponse] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [nextPage, setNextPage] = React.useState(null);

    const loadGames = (pageUrl) => {
        if (pageUrl) {
            setIsLoading(true);
            ApiClient().get(pageUrl)
                .then((res) => {
                    setGames((prevGames) => [...prevGames, ...res.data.data.games]);
                    setNextPage(res.data.data.next_page_url);
                    setResponse(res.data)
                    setIsLoading(false);
                    setTimeout(refreshPageSize, 50)
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('Failed to get the data', err);
                });
        }
    };

    React.useEffect(() => {
        loadGames(`/protection/${slug}`);
    }, []); // Load initial data

    const scrollListener = React.useRef(null);

    React.useEffect(() => {
        scrollListener.current = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            if (scrollPosition >= totalHeight && !isLoading && nextPage) {
                loadGames(nextPage);
            }
        };

        window.addEventListener('scroll', scrollListener.current);

        return () => {
            window.removeEventListener('scroll', scrollListener.current);
        };
    }, [nextPage, isLoading]);

    const showGames = games?.map((drm, index) => (
        <GameCard animate={true} info={drm} key={index}/>
    ));


    const placeholders = [];
    for (let i = 0; i < 12; i++) {
        placeholders.push(<GameCard className="w-[400px]" key={i}/>);
    }

    refreshPageSize()
    return (
        <>
            <BlurredBackground/>
            <div className="border-b border-gray-500/50 pb-2 text-xl">
                <span className='text-2xl font-bold'>{response?.data.name}</span>
                <span className='text-md'>{response ? ' Games' : ''}</span>
                {!response &&
                    <div className="w-full md:w-1/3">
                        <Skeleton width={'100%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                    </div>
                }
            </div>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                {games.length > 0 || placeholders}
                {showGames}
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
};

export default Protection;
