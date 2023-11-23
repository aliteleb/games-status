import React, {useEffect, useState} from 'react';
import ApiClient from '../../services/ApiClient';
import {useParams} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import GameCard from '../layouts/GameCard'
import BlurredBackground, {refreshPageSize} from "../core/BlurredBackground.jsx";

function User() {
    const {username} = useParams();

    const [games, setGames] = useState([]);
    const [response, setResponse] = React.useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [nextPage, setNextPage] = useState(null);

    const loadGames = (pageUrl) => {
        if (pageUrl) {
            setIsLoading(true);
            ApiClient().get(pageUrl)
                .then((res) => {
                    setGames((prevGames) => [...prevGames, ...res.data.data.games.data]);
                    setNextPage(res.data.data.games.next_page_url);
                    setResponse(res.data.data)
                    setIsLoading(false);
                    setTimeout(refreshPageSize, 50)
                })
                .catch((err) => {
                    setIsLoading(false);
                });
        }
    };

    React.useEffect(() => {
        loadGames(`/user/${username}`);
    }, []); // Load initial data


    const scrollListener = React.useRef(null);

    useEffect(() => {
        scrollListener.current = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            if (scrollPosition >= totalHeight && !isLoading && nextPage) {
                loadGames(nextPage);
            }
        };

        window.addEventListener('scroll', scrollListener.current);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', scrollListener.current);
        };
    }, [nextPage, isLoading]);

    const showGames = games?.map((game, index) => (
        <GameCard animate={true} info={game} key={index}/>
    ));

    const placeholders = [];
    for (let i = 0; i < 6; i++) {
        placeholders.push(<GameCard key={i}/>);
    }

    return (
        <>
            <div className='relative flex w-full justify-between overflow-hidden rounded-md h-[22rem]'>
                <div className="absolute h-full w-full bg-black/70 z-[-1]"
                     style={{ clipPath: "polygon(66.6666% 0px, 100% 0%, 100% 100%, 33.3333% 100%)",
                }}
                />
                <div className="absolute h-full w-full bg-black/50 z-[-1]"
                     style={{ clipPath: "polygon(0 0px, 66.6666% 0%, 33.3333% 100%, 0 100%)",
                }}
                />
                <div className='flex flex-col justify-center w-full overflow-hidden rounded-md'>
                    <div className='flex justify-between'>
                        <div className='flex w-full flex-col items-center justify-center'>
                            { response &&
                                <img
                                    className={`col-span-2 border-2 border-gray-600 rounded-full sm:col-auto w-[100px] h-[100px] object-cover`}
                                    src={response ? response.avatar : ''}
                                    alt=''
                                />
                            }
                            { !response &&
                                <Skeleton width={100} height={100} baseColor={'#27282e99'} circle={true} highlightColor={'#424349'}/>
                            }

                            <h1 className='mt-3 text-lg sm:text-xl'>{response ? response.display_name :
                                <Skeleton width={150} height={20} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}</h1>
                        </div>
                        <div className='col-span-2 m-auto w-full pt-3 text-center md:col-span-1 md:border-0'>
                            <div className='text-2xl font-extralight text-gray-400'>{response ? "GAMES" :
                                <Skeleton width={'25%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                            </div>
                            <div className='my-2 text-2xl font-bold'>
                                {response ? response?.games.total : <Skeleton width={'15%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-16 text-gray-300 flex justify-center items-center'>
                        <div className='text-2xl font-extralight text-gray-400'>{response ? "Member since:" :
                            <Skeleton width={'25%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                        </div>
                        <div className='my-2 mx-3 text-2xl font-bold'>
                            {response ? response?.member_since : <Skeleton width={'15%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-6 flex flex-col justify-between'>
                <div className="border-b border-gray-500/50 pb-2 text-xl">{response && `Games (${response?.games.total})`}</div>
                <div className="mt-3 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {!response && placeholders}
                    {showGames}
                    {games.length === 0 && <div className='col-span-3 text-center text-xl'>This user not following any games yet.</div>}
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
            </div>
        </>
    );
}

export default User;
