import GameCard from "../layouts/GameCard.jsx";
import {useAuth} from "../api/AuthContext.jsx";

export default function Home() {

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
                    <GameCard title="Red Dead Redamption" statusText="CRACKED" image="https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg"
                              size="large" days="364"/>
                <div className="grid grid-cols-[1fr_1fr] gap-2 mt-2 md:mt-0">
                    <GameCard title="FIFA 22" statusText="UNCRACKED" image="https://cdn.akamai.steamstatic.com/steam/apps/1506830/header.jpg" days="14"/>
                    <GameCard title="Cyberpunk 2077" statusText="CRACKED" image="https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?" days="5"/>
                    <GameCard title="Elden Ring" statusText="CRACKED" image="https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg" days="66"/>
                    <GameCard title="TEKKEN 8" statusText="UNRELEASED" image="https://cdn.akamai.steamstatic.com/steam/apps/1778820/header.jpg" days="17"/>
                    <GameCard/>
                    <GameCard/>
                </div>
            </div>
        </>
    )

}
