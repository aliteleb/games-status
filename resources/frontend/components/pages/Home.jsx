import GameCard from "../layouts/GameCard.jsx";
import React from "react";
import ApiClient from "../../services/ApiClient.js";
import { Link } from "react-router-dom";
import BlurredBackground, {refreshPageSize} from "../core/BlurredBackground.jsx";


export default function Home() {

    const [gamesData, setGamesData] = React.useState([]);
    const [latestCrackedGames, setLatestCrackedGames] = React.useState([]);
    const [upcomingGames, setUpcomingGames] = React.useState([]);
    const [showText, setShowText] = React.useState('');

    React.useEffect(() => {
        ApiClient().get('/home')
            .then((res) => {
                setGamesData(res.data)
                setLatestCrackedGames(res.data)
                setUpcomingGames(res.data)
            }).catch(err => {})

    }, [])

    let mainGame = null;
    let sideGames = null;
    if (gamesData.data && gamesData.data.hot_games) {
        let mainGameData = gamesData.data.hot_games[0];
        mainGame =
            <GameCard info={mainGameData} size='large' animate={true}/>;

        sideGames = gamesData.data.hot_games.slice(1).map(game => (
            <GameCard key={game.id} info={game} animate={true}/>
        ));
    }

    let latest_cracked_games = null
    if(latestCrackedGames.data && latestCrackedGames.data.latest_cracked_games){
        latest_cracked_games = latestCrackedGames.data.latest_cracked_games.map(game => (
            <GameCard key={game.id} info={game} animate={true}/>
        ));
    }

    let upcomin_Games = null
    if(upcomingGames.data && upcomingGames.data.latest_unreleased_games){
        upcomin_Games = upcomingGames.data.latest_unreleased_games.map(game => (
            <GameCard key={game.id} info={game} animate={true}/>
        ));
    }

    React.useEffect( () => {

        if (gamesData?.data?.notes[0]?.body) {
            let text = gamesData.data.notes[0].body;

            for(let i=0; i<text.length; i++){
                setTimeout ( ()=> {
                    setShowText(prev => prev + text[i])
                }, i*30 )
            }
        }
    }, [gamesData] )


    refreshPageSize()
    return (
        <>
            <div>
                { gamesData?.data?.notes[0].body ?
                <div className="flex flex-col md:flex-row justify-between items-center bg-black/50 px-3 rounded">
                    <img className="w-16 h-16" src="../../../../public/assets/images/1.png" alt="" />
                    <p className="tracking-normal w-[80%] text-md px-2 text-center md:text-left text-gray-300 mt-2 md:mt-0 md:mx-2">{showText}</p>
                    <Link to="/terms-conditions" type="button" className="text-gray-300 bg-white/5 hover:bg-white/10 my-4 md:py-2 px-2 md:text-center py-3 px-3 font-medium rounded text-sm xl:px-3 xl:py-3 transition">Terms & Conditions</Link>
                </div> :
                <div className="animate-skeleton h-32 md:h-16 flex justify-between items-center bg-black/50 px-4 py-2 rounded"></div>}


                <div className='flex flex-wrap justify-between mt-8'>
                    <div className='text-white text-lg font-bold'>Hot Games</div>
                    <div className='text-white text-sm'>
                        <div className='inline-block mx-2 w-[7px] h-[7px] bg-green-700 rounded-full pulse'></div>
                        Live updates
                    </div>
                </div>
                <div className='h-[1px] bg-[#494a4f] mb-2 mt-1'/>
                <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] gap-2'>

                    {mainGame || <GameCard size='large'/>}

                    <div className="mt-2 grid gap-2 grid-cols-1 sm:grid-cols-[1fr_1fr] md:mt-0">
                        {sideGames ||
                            <>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                            </>
                        }

                    </div>
                </div>
            </div>

            <div className="mt-16">
                <div className='flex flex-wrap justify-between mt-8'>
                    <div className='text-white text-lg font-bold'>Latest Cracked Games</div>
                </div>
                <div className='h-[1px] bg-[#494a4f] mb-2 mt-1'/>
                    <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] md:mt-0">
                        {latest_cracked_games ||
                            <>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                            </>
                        }
                    </div>
            </div>

            <div className="mt-16">
                <div className='flex flex-wrap justify-between mt-8'>
                    <div className='text-white text-lg font-bold'>Upcoming Games</div>
                </div>
                <div className='h-[1px] bg-[#494a4f] mb-2 mt-1'/>
                    <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] md:mt-0">
                        {upcomin_Games ||
                            <>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                                <GameCard/>
                            </>
                        }
                    </div>
            </div>
        </>
    )

}
