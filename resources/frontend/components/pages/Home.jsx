import GameCard from "../layouts/GameCard.jsx";
import React from "react";
import ApiClient from "../../services/ApiClient.js";
import { Link } from "react-router-dom";
import BlurredBackground, {refreshPageSize} from "../core/BlurredBackground.jsx";


export default function Home() {

    const [gamesData, setGamesData] = React.useState([]);
    const [showText, setShowText] = React.useState('');

    React.useEffect(() => {
        ApiClient().get('/home')
            .then((res) => {
                setGamesData(res.data)
            }).catch(err => console.log(err))

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
            { gamesData?.data?.notes[0].body ? 
            <div className="flex flex-col md:flex-row justify-between items-center bg-black/50 px-4 py-2 rounded">
                <img className="w-10 h-10" src="../../../../public/assets/images/logo.png" alt="" />
                <p className="tracking-normal w-[80%] text-md px-2 text-center md:text-left text-gray-300 mt-2 md:mt-0 md:mx-2">{showText}</p>
                <Link to="/terms-conditions" type="button" class="text-gray-300 bg-white/5 hover:bg-white/10 mt-2 md:mt-0 font-medium rounded text-sm px-5 py-2.5 transition">Terms & Conditions</Link>
            </div> :
            <div className="animate-skeleton h-32 md:h-14 flex justify-between items-center bg-black/50 px-4 py-2 rounded"></div>}


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

                <div className="mt-2 grid gap-2 grid-cols-[1fr_1fr] md:mt-0">
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
        </>
    )

}
