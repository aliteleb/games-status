import GameCard from "../layouts/GameCard.jsx";
import React from "react";
import ApiClient from "../../services/ApiClient.js";

export default function Home() {

    let [gamesData, setGamesData] = React.useState([]);

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

    return (
        <>
            <div className={'flex flex-wrap justify-between'}>
                <div className={'text-white text-lg font-bold'}>Hot Games</div>
                <div className={'text-white text-sm'}>
                    <div className={'inline-block mx-2 w-[7px] h-[7px] bg-green-700 rounded-full animate-pulse'}></div>
                    Live updates
                </div>
            </div>
            <div className={'h-[1px] bg-[#494a4f] mb-2 mt-1'}/>
            <div className={'grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] gap-2'}>

                {mainGame || <GameCard size='large'/>}

                <div className="grid grid-cols-[1fr_1fr] gap-2 mt-2 md:mt-0">
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
