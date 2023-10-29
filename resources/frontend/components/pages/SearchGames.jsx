import React, {useEffect} from 'react'
import Select from 'react-select';
import ApiClient from '../../services/ApiClient'
import GameCard from '../layouts/GameCard';
import {refreshPageSize} from "../core/BlurredBackground.jsx";

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
            <div className={`grid grid-cols-[150px_1fr] text-center py-2 my-1 border-r-4 bg-black/20 border-${game.status_color}`}>
                <img className={`h-full ${game.image && 'animate-fade-in'}`}
                     src={game.image ? game.image : '/assets/images/game-placeholder-vertical.jpg'} alt=""/>
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] justify-between text-center items-center">
                    <div>{game.title}</div>
                    <div>{game.release_date ? game.release_date : "N/A"}</div>
                    <div>{game.crack_date ? game.crack_date : "N/A"}</div>
                    <div>
                        {game.protections?.map(protection => (
                            <span className="mx-1" key={protection}>{protection}</span>
                        ))}
                        {game.protections.length === 0 || game.protections[0] === "" ? <span className="opacity-50">TBD</span> : ""}
                    </div>
                    <div>
                        {game.groups?.map(group => (
                            <span className="mx-1" key={group}>{group}</span>
                        ))}
                        {game.groups.length === 0 || game.groups[0] === "" ? <span className="opacity-50">TBD</span> : ""}
                    </div>
                </div>
            </div>
        )

    });


    const placeholders = [];
    for (let i = 0; i < 6; i++) {
        placeholders.push(<GameCard key={i}/>);
    }

    console.log(games);

    return (

        <>
            <div className='bg-app-black/50'>

                <style dangerouslySetInnerHTML={{__html: styles}}/>

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

            <div className={`flex flex-col text-gray-300 shadow-lg overflow-hidden border-2 border-app-black/50`}>
                <div className="grid grid-cols-[150px_1fr] text-center bg-app-black/50 py-3 border-y-2 border-gray-700">
                    <span>Cover</span>
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] text-center">
                        <div>GAME</div>
                        <div>Release Date</div>
                        <div>Crack Date</div>
                        <div>PROTECTIONS</div>
                        <div>SCENE GROUPS</div>
                    </div>
                </div>
                {!games && placeholders}

                {games &&
                    <div className="">
                        {showGames}
                    </div>
                }
            </div>

        </>

    )
}

export default SearchGames
