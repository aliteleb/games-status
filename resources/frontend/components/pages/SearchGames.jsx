import React, {useEffect} from 'react'
import Select from 'react-select';
import ApiClient from '../../services/ApiClient'
import {refreshPageSize} from "../core/BlurredBackground.jsx";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {LiaCcDiscover} from 'react-icons/lia'
import {IoGameControllerOutline} from 'react-icons/io5'
import {HiOutlineRocketLaunch, HiUserGroup} from 'react-icons/hi2'
import {GiCrackedShield} from 'react-icons/gi'
import {GiPirateFlag} from 'react-icons/gi'
import {BsShieldExclamation} from 'react-icons/bs'

function SearchGames() {

    const [formData, setFormData] = React.useState({
        search_text: "",
        crack_status: null,
        release_status: null,
        selected_genres: [],

    })
    const [games, setGames] = React.useState([]);
    const [response, setResponse] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [nextPage, setNextPage] = React.useState(null);
    const [crackStatus, setCrackStatus] = React.useState([])
    const [genres, setGenres] = React.useState([])


    const releaseStatus = [
        {value: "0", label: "ALL"},
        {value: "1", label: "RELEASED"},
        {value: "2", label: "UNRELEASED"},
    ]


    // Define your styles as a string
    const styles = `
    .react-select-container .react-select__input-container,
    .react-select-container .react-select__placeholder,
    .react-select-container .react-select__single-value {
        padding: 8px 0;
    }`;

    const loadGames = (pageUrl) => {
        if (pageUrl) {
            setIsLoading(true);
            ApiClient().post(pageUrl,
                {
                    "search": formData.search_text,
                    "crack_status": formData.crack_status,
                    "release_status": formData.release_status,
                    "genres": formData.selected_genres
                })
                .then((res) => {
                    setGames((prevGames) => [...prevGames, ...res.data.data.games.data]);
                    setNextPage(res.data.data.games.next_page_url);

                    let statuses = res.data.data.statuses;
                    let genres = res.data.data.genres;
                    const statusesArray = Object.keys(statuses).map(key => ({value: key, label: statuses[key]}));
                    const genresArray = Object.keys(genres).map(key => ({value: key, label: genres[key]}));
                    setCrackStatus(statusesArray);
                    setGenres(genresArray);

                    setIsLoading(false);
                    setTimeout(refreshPageSize, 50)
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log('Failed to get the data', err);
                });
        }
    };


// Start Search Proccess

    const handleSearchChange = (e) => {
        setFormData(prevSearchGame => (
            {
                ...prevSearchGame,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSelectChange = (name, selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedValues,
        }));
    };

    const handleSingleSelectChange = (name, selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedOption.value, // Store the value directly, not an array
        }));
    };


    useEffect(() => {

        ApiClient().post('/games',
            {
                "search": formData.search_text,
                "crack_status": formData.crack_status,
                "release_status": formData.release_status,
                "genres": formData.selected_genres
            }).then(res => {
            setGames(res.data.data.games.data)
            setResponse(res.data)
        }).catch(err => {
            toast.error(err.response.message)
        })

    }, [formData.crack_status, formData.release_status, formData.search_text, formData.selected_genres])

// End Search Proccess


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


    const showGames = games?.map((game, index) => {
        game.status_color = game?.status_text ? game?.status_text.toLowerCase() : 'gray-600'
        const statusText = game.status_text || ''

        switch (statusText) {
            case "CRACKED":
                game.status_long = `AFTER ${game.days_diff} DAYS`
                break
            case "UNCRACKED":
                game.status_long = `${game.days_diff} DAYS AND COUNTING`
                break
            default:
                break;
        }

        return (
            <div key={index} className={`grid grid-cols-[1fr_3fr] lg:grid-cols-[150px_1fr] text-center py-2 my-1 border-r-4 bg-black/20 border-${game.status_color}`}>
                <img className={`h-full w-32 object-cover ${game.image && 'animate-fade-in'}`}
                     src={game.image ? game.image : '/assets/images/game-placeholder-vertical.jpg'} alt=""/>
                <div className="grid items-center text-center text-gray-400 grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
                    <div className="my-3 text-lg font-bold text-gray-300 lg:my-0 lg:pl-4 lg:text-left">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">GAME</div>
                        <Link to={`/game/${game.slug}`} className="transition hover:text-white">{game.title}</Link>
                    </div>
                    <div className="my-3 text-lg lg:my-0">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">RELEASE DATE</div>
                        {game.release_date ? game.release_date : <span className="opacity-50">N/A</span>}
                    </div>
                    <div className="my-3 text-lg lg:my-0">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">CRACK DATE</div>
                        {game.crack_date ? game.crack_date : <span className="opacity-50">N/A</span>}
                    </div>
                    <div className="my-3 text-lg lg:my-0">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">PROTECTIONS</div>
                        {game.protections?.map((protection, index) => (
                            <Link to={`/protection/${protection.slug}`} className="mx-1 transition hover:text-gray-200" key={index}>{protection.name}</Link>
                        ))}
                        {game.protections.length === 0 || game.protections[0].name === "" ? <span className="opacity-50">TBD</span> : ""}
                    </div>
                    <div className="my-3 text-lg lg:my-0 lg:pr-4 lg:text-right">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">SCENE GROUPS</div>
                        {game.groups?.map((group, index) => (
                            <Link to={`/group/${group.slug}`} className="mx-1 block transition hover:text-gray-200" key={index}>{group.name}</Link>
                        ))}
                        {game.groups.length === 0 || game.groups[0].name === "" ? <span className="opacity-50">N/A</span> : ""}
                    </div>

                </div>
            </div>
        )

    });


    const placeholders = [];
    for (let i = 0; i < 12; i++) {
        placeholders.push(
            <div key={i} className={`grid grid-cols-[1fr_3fr] lg:grid-cols-[150px_1fr] text-center py-2 my-1 border-r-4 bg-black/20 border-gray-600`}>
                <img className={`h-14 w-32 object-cover`}
                     src='/assets/images/game-placeholder.jpg' alt=""/>
                <div className="grid items-center text-center grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
                    <div className="my-3 text-lg lg:my-0 lg:pl-4 lg:text-left">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">GAME</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>
                    <div className="my-3 text-lg lg:my-0">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">RELEASE DATE</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>
                    <div className="my-3 text-lg lg:my-0">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">CRACK DATE</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>
                    <div className="my-3 text-lg lg:my-0">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">PROTECTIONS</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>
                    <div className="my-3 text-lg lg:my-0 lg:pr-4 lg:text-right">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">SCENE GROUPS</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>

                </div>
            </div>
        );
    }


    return (

        <>
            <div className='bg-app-black/50'>

                <style dangerouslySetInnerHTML={{__html: styles}}/>

                <header className='p-5'>
                    <input
                        type="text"
                        placeholder='Search...'
                        autoComplete="one-time-code"
                        className='h-12 w-full rounded-sm px-3 text-lg uppercase bg-body focus:outline-none'
                        name='search_text'
                        value={formData.search_text}
                        onChange={handleSearchChange}
                    />
                    <div className='mt-2 flex w-full flex-col items-center justify-between md:flex md:flex-row md:gap-x-12 xl:gap-x-24'>
                        <Select
                            options={crackStatus}
                            placeholder="Select Status..."
                            className='mt-2 w-2/3 uppercase react-select-container md:w-1/3'
                            classNamePrefix="react-select"
                            value={crackStatus.find(option => option.value === formData.crack_status)}
                            onChange={(selectedOption) => handleSingleSelectChange('crack_status', selectedOption)}
                        />
                        <Select
                            options={releaseStatus}
                            placeholder="Release Status..."
                            className='mt-2 w-2/3 uppercase react-select-container md:w-1/3'
                            classNamePrefix="react-select"
                            value={releaseStatus.find(option => option.value === formData.release_status)}
                            onChange={(selectedOption) => handleSingleSelectChange('release_status', selectedOption)}
                        />
                        <Select
                            options={genres}
                            placeholder="Select Genres..."
                            className='mt-2 w-2/3 uppercase react-select-container md:w-1/3'
                            classNamePrefix="react-select"
                            isMulti
                            value={formData.selected_genres.map(genre => genres.find(option => option.value === genre))}
                            onChange={(selectedOptions) => handleSelectChange('selected_genres', selectedOptions)}
                        />
                    </div>
                </header>
            </div>

            <div className={`flex flex-col text-gray-300 shadow-lg overflow-hidden border-2 border-app-black/50`}>
                <div className="hidden border-y-2 border-gray-700 py-4 text-center text-lg font-extrabold text-gray-500 grid-cols-[150px_1fr] divide-gray-600 divide-x bg-app-black/50 lg:grid">
                    <span className='flex items-center gap-x-2 px-2'>
                        <LiaCcDiscover className='h-6 w-6 text-gray-400'/>
                        COVER
                    </span>
                    <div className="grid text-center grid-cols-[1fr_1fr_1fr_1fr_1fr] divide-gray-600 divide-x">
                        <div className="flex items-center gap-x-2 lg:pl-4 lg:text-left">
                            <IoGameControllerOutline className='h-6 w-6 text-gray-400'/>
                            GAME
                        </div>
                        <div className='flex items-center justify-center gap-x-2'>
                            <HiOutlineRocketLaunch className='h-6 w-6 text-gray-400'/>
                            Release Date
                        </div>
                        <div className='flex items-center justify-center gap-x-2'>
                            <GiCrackedShield className='h-6 w-6 text-gray-400'/>
                            Crack Date
                        </div>
                        <div className='flex items-center justify-center gap-x-2'>
                            <BsShieldExclamation className='h-6 w-6 text-gray-400'/>
                            PROTECTIONS
                        </div>
                        <div className="flex items-center justify-center gap-x-2 lg:pr-4 lg:text-right">
                            <GiPirateFlag className='h-6 w-6 text-gray-400'/>
                            SCENE GROUPS
                        </div>
                    </div>
                </div>
                {!response && placeholders}
                {response && games.length === 0 ?
                    <div className="p-6 text-center text-lg">No results found</div>
                    : ''}

                {games &&
                    <div className="">
                        {showGames}
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
                }
            </div>

        </>

    )
}

export default SearchGames
