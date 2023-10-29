import React, { useEffect } from 'react'
import Select from 'react-select';
import ApiClient from '../../services/ApiClient'
import GameCard from '../layouts/GameCard';
import Skeleton from 'react-loading-skeleton';
import BlurredBackground, {refreshPageSize} from "../core/BlurredBackground.jsx";
import { Link } from 'react-router-dom';

function SearchGames() {

    const [games, setGames] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [nextPage, setNextPage] = React.useState(null);
    const [searchGame, setSearchGame] = React.useState({
        search_text: ""
    })

    const crackStatus = [
        {value: "ALL", label: "ALL"},
        {value: "CRACKED", label: "CRACKED"},
        {value: "UNCRACKED", label: "UNCRACKED"},
    ]

    const releaseStatus = [
        {value: "ALL", label: "ALL"},
        {value: "RELEASED", label: "RELEASED"},
        {value: "UNRELEASED", label: "UNRELEASED"},
    ]

    const genres = [
        {value: "ACTION", label: "ACTION"},
        {value: "FANCY", label: "FANCY"},
        {value: "ADVENTURE", label: "ADVENTURE"},
    ]

    // Define your styles as a string
    const styles = `
    .react-select-container .react-select__input-container,
    .react-select-container .react-select__placeholder,
    .react-select-container .react-select__single-value {
        padding: 14px 0; 
    }`;

    let handleSearchChange = (e) => {
        setSearchGame(prevSearchGame => (
            {
                ...prevSearchGame,
                [e.target.name]: e.target.value
            }
        ))
    }

    const loadGames = (pageUrl) => {
        if (pageUrl) {
            setIsLoading(true);
            ApiClient().get(pageUrl)
                .then((res) => {
                    setGames((prevGames) => [...prevGames, ...res.data.data.data]);
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

    React.useEffect(() => {
        loadGames(`/games`);
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
        <div className={`flex relative z-20 h-[16rem] text-gray-300 border-t-[5px] border-${game.status_color} shadow-lg overflow-hidden`}
                style={{boxShadow: 'rgb(0, 0, 0) 0px 0px 10px'}}>
            <div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[350px_2fr_1fr] w-full bg-black/80 justify-items-center'>
                <img className={`col-span-2 sm:col-auto w-[350px] h-full ${game.image && 'animate-fade-in'}`}
                        src={game.image ? game.image : '/assets/images/game-placeholder-vertical.jpg'} alt=""/>
                <div className="h-[22rem] w-full px-4 py-2 text-center sm:text-left">
                    <div className="grid grid-rows-[1fr_1fr] w-max mx-auto sm:mx-0 mt-2 sm:mt-0">
                        <div className='flex justify-between'>
                            <div className='text-white/40 font-extralight'>{game.status_text && 'STATUS'}</div>
                            <div className={`text-lg text-${game.status_color}`}>
                                {game.status_long || <Skeleton height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                            </div>
                        </div>
                        <div className={`text-${game.status_color} w-full text-[3rem] rounded font-bold -mt-[2rem]`}>
                            {game.status_text || <Skeleton width={'20rem'} height={'30px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={'30px'}/>}
                        </div>
                    </div>
                    <div className='w-full my-5'>
                        <div className='text-[#dddddd99] font-extralight'>GAME</div>
                        <div className='text-xl'>
                            {game.name || <Skeleton width={'90%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-y-4 justify-between'>
                        <div>
                            <div className='text-[#dddddd99] font-extralight'>RELEASE DATE</div>
                            <div className='text-xl'>
                                {game.release_date || <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                            </div>
                        </div>
                        <div>
                            <div className='text-[#dddddd99] font-extralight'>DRM PROTECTIONS</div>
                            <div className='text-xl'>
                                {game.protections?.map((drm, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                            to={`/protection/${drm.slug}`}>{drm.name}</Link>)}
                                {game.protections?.length === 0 &&
                                    <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                            </div>
                        </div>
                        <div>
                            <div className='text-[#dddddd99] font-extralight'>CRACK DATE</div>
                            <div className='text-xl'>
                                {game.crack_date || <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                            </div>
                        </div>
                        <div>
                            <div className='text-[#dddddd99] font-extralight'>SCENE GROUPS</div>
                            <div className='text-xl'>
                                {game.groups?.map((group, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                            to={`/group/${group.slug}`}>{group.name}</Link>)}
                                {game.groups?.length === 0 && <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center border-t md:border-0 border-gray-300 w-[80%] pt-3 md:col-span-1 col-span-2 m-auto'>
                                
                </div>
            </div>
        </div>
    ));

    const placeholders = [];
    for (let i = 0; i < 6; i++) {
        placeholders.push(<GameCard key={i}/>);
    }

    console.log(games);

    return (

        <>
            <div className='bg-app-black/50 rounded'>

                <style dangerouslySetInnerHTML={{ __html: styles }} />

                <header className='p-5'>
                    <input
                    type="text"
                    placeholder='Search...'
                    className='w-full h-16 text-xl uppercase rounded-sm px-3 bg-body focus:outline-none'
                    name='search_text'
                    value={searchGame.search_text}
                    onChange={handleSearchChange}
                    />
                    <div className='flex mt-4 justify-between gap-x-24'>
                        <Select 
                            options={crackStatus}
                            placeholder="Select Status..."
                            className='react-select-container mt-2 w-1/3 uppercase'
                            classNamePrefix="react-select"
                        />
                        <Select 
                            options={releaseStatus}
                            placeholder="Release Status..."
                            className='react-select-container mt-2 w-1/3 uppercase'
                            classNamePrefix="react-select"
                        />
                        <Select 
                            options={genres}
                            placeholder="Select Genres..."
                            className='react-select-container mt-2 w-1/3 uppercase'
                            classNamePrefix="react-select"
                            isMulti
                        />
                    </div>
                </header>
            </div>

            <div className={`flex flex-col relative z-20 text-gray-300 border-t-[5px] border-${games?.status_color} shadow-lg overflow-hidden`}
                     style={{boxShadow: 'rgb(0, 0, 0) 0px 0px 10px'}}>
                    <img className={`absolute w-32 h-32 z-[-1] object-cover`} src={games?.cover && games?.cover}
                         style={{aspectRatio: '1920/620'}}
                         alt=""/>

                         {!games &&  placeholders}
                         {showGames}

                    <div className='flex w-full bg-black/80'>
                        <img className={`w-60 object-cover h-[10rem] ${games?.poster && 'animate-fade-in'}`}
                             src={games?.poster ? games?.poster : '/assets/images/game-placeholder-vertical.jpg'} alt=""/>
                        <div className="h-[22rem] w-full px-4 py-2 text-center sm:text-left">
                            <div className="grid grid-rows-[1fr_1fr] w-max mx-auto sm:mx-0 mt-2 sm:mt-0">
                                <div className='flex justify-between'>
                                    <div className='text-white/40 font-extralight'>{games?.status_text && 'STATUS'}</div>
                                    <div className={`text-lg text-${games?.status_color}`}>
                                        {games?.status_long || <Skeleton height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                                    </div>
                                </div>
                                <div className={`text-${games?.status_color} w-full text-[3rem] rounded font-bold -mt-[2rem]`}>
                                    {games?.status_text || <Skeleton width={'20rem'} height={'30px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={'30px'}/>}
                                </div>
                            </div>
                            <div className='w-full my-5'>
                                <div className='text-[#dddddd99] font-extralight'>GAME</div>
                                <div className='text-xl'>
                                    {games?.name || <Skeleton width={'90%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-y-4 justify-between'>
                                <div>
                                    <div className='text-[#dddddd99] font-extralight'>RELEASE DATE</div>
                                    <div className='text-xl'>
                                        {games?.release_date || <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                    </div>
                                </div>
                                <div>
                                    <div className='text-[#dddddd99] font-extralight'>DRM PROTECTIONS</div>
                                    <div className='text-xl'>
                                        {games?.protections?.map((drm, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                                    to={`/protection/${drm.slug}`}>{drm.name}</Link>)}
                                        {games?.protections?.length === 0 &&
                                            <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                    </div>
                                </div>
                                <div>
                                    <div className='text-[#dddddd99] font-extralight'>CRACK DATE</div>
                                    <div className='text-xl'>
                                        {games?.crack_date || <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                    </div>
                                </div>
                                <div>
                                    <div className='text-[#dddddd99] font-extralight'>SCENE GROUPS</div>
                                    <div className='text-xl'>
                                        {games?.groups?.map((group, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                                 to={`/group/${group.slug}`}>{group.name}</Link>)}
                                        {games?.groups?.length === 0 && <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </>

    )
}

export default SearchGames
