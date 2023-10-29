import React, {useEffect} from 'react'
import Select from 'react-select';
import ApiClient from '../../services/ApiClient'
import {refreshPageSize} from "../core/BlurredBackground.jsx";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

function SearchGames() {

    const [formData, setFormData] = React.useState({
        search_text: "",
        crack_status: null,
        release_status: null,
        selected_genres: [],

    })
    const [games, setGames] = React.useState([]);
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
            ApiClient().post(pageUrl)
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
            <div className={`grid grid-cols-[1fr_3fr] lg:grid-cols-[150px_1fr] text-center py-2 my-1 border-r-4 bg-black/20 border-${game.status_color}`}>
                <img className={`h-full w-32 object-cover ${game.image && 'animate-fade-in'}`}
                     src={game.image ? game.image : '/assets/images/game-placeholder-vertical.jpg'} alt=""/>
                <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] text-center items-center">
                    <div className="my-3 lg:my-0 text-lg lg:text-left lg:pl-4">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">GAME</div>
                        {game.title}
                    </div>
                    <div className="my-3 lg:my-0 text-lg">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">RELEASE DATE</div>
                        {game.release_date ? game.release_date : <span className="opacity-50">N/A</span>}
                    </div>
                    <div className="my-3 lg:my-0 text-lg">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">CRACK DATE</div>
                        {game.crack_date ? game.crack_date : <span className="opacity-50">N/A</span>}
                    </div>
                    <div className="my-3 lg:my-0 text-lg">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">PROTECTIONS</div>
                        {game.protections?.map(protection => (
                            <span className="mx-1" key={protection}>{protection}</span>
                        ))}
                        {game.protections.length === 0 || game.protections[0] === "" ? <span className="opacity-50">TBD</span> : ""}
                    </div>
                    <div className="my-3 lg:my-0 text-lg lg:text-right lg:pr-4">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">SCENE GROUPS</div>
                        {game.groups?.map(groups => (
                            <span className="mx-1" key={groups}>{groups}</span>
                        ))}
                        {game.groups.length === 0 || game.groups[0] === "" ? <span className="opacity-50">N/A</span> : ""}
                    </div>

                </div>
            </div>
        )

    });


    const placeholders = [];
    for (let i = 0; i < 12; i++) {
        placeholders.push(
            <div className={`grid grid-cols-[1fr_3fr] lg:grid-cols-[150px_1fr] text-center py-2 my-1 border-r-4 bg-black/20 border-gray-600`}>
                <img className={`h-14 w-32 object-cover`}
                     src='/assets/images/game-placeholder.jpg' alt=""/>
                <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] text-center items-center">
                    <div className="my-3 lg:my-0 text-lg lg:text-left lg:pl-4">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">GAME</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>
                    <div className="my-3 lg:my-0 text-lg">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">RELEASE DATE</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>
                    <div className="my-3 lg:my-0 text-lg">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">CRACK DATE</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>
                    <div className="my-3 lg:my-0 text-lg">
                        <div className="text-[#dddddd99] font-extralight text-sm lg:hidden">PROTECTIONS</div>
                        <Skeleton height={'20px'} width={'80%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={50}/>
                    </div>
                    <div className="my-3 lg:my-0 text-lg lg:text-right lg:pr-4">
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
                        className='w-full h-12 text-lg uppercase rounded-sm px-3 bg-body focus:outline-none'
                        name='search_text'
                        value={formData.search_text}
                        onChange={handleSearchChange}
                    />
                    <div className='flex flex-col w-full items-center md:flex md:flex-row mt-2 justify-between md:gap-x-12 xl:gap-x-24'>
                        <Select
                            options={crackStatus}
                            placeholder="Select Status..."
                            className='react-select-container mt-2 w-2/3 md:w-1/3 uppercase'
                            classNamePrefix="react-select"
                            value={crackStatus.find(option => option.value === formData.crack_status)}
                            onChange={(selectedOption) => handleSingleSelectChange('crack_status', selectedOption)}
                        />
                        <Select
                            options={releaseStatus}
                            placeholder="Release Status..."
                            className='react-select-container mt-2 w-2/3 md:w-1/3 uppercase'
                            classNamePrefix="react-select"
                            value={releaseStatus.find(option => option.value === formData.release_status)}
                            onChange={(selectedOption) => handleSingleSelectChange('release_status', selectedOption)}
                        />
                        <Select
                            options={genres}
                            placeholder="Select Genres..."
                            className='react-select-container mt-2 w-2/3 md:w-1/3 uppercase'
                            classNamePrefix="react-select"
                            isMulti
                            value={formData.selected_genres.map(genre => genres.find(option => option.value === genre))}
                            onChange={(selectedOptions) => handleSelectChange('selected_genres', selectedOptions)}
                        />
                    </div>
                </header>
            </div>

            <div className={`flex flex-col text-gray-300 shadow-lg overflow-hidden border-2 border-app-black/50`}>
                <div className="hidden lg:grid grid-cols-[150px_1fr] text-center bg-app-black/50 py-3 border-y-2 border-gray-700">
                    <span>Cover</span>
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] text-center">
                        <div className="lg:text-left lg:pl-4">GAME</div>
                        <div>Release Date</div>
                        <div>Crack Date</div>
                        <div>PROTECTIONS</div>
                        <div className="lg:text-right lg:pr-4">SCENE GROUPS</div>
                    </div>
                </div>
                {games.length === 0 && placeholders}

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
