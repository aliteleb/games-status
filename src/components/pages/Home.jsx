import React from 'react'
import GameCard from "../layouts/GameCard.jsx";

function Home() {
    return (
        <div className={'container'}>
            <div className={'h-12'}/>
            <div className={'flex flex-wrap justify-between px-2 md:px-1'}>
                <div className={'text-white text-lg font-bold'}>Hot Games</div>
                <div className={'text-white text-sm'}>
                    <div className={'inline-block mx-2 w-[7px] h-[7px] bg-green-700 rounded-full animate-pulse'}></div>
                    Live updates
                </div>
            </div>
            <div className={'h-[1px] bg-[#494a4f] mb-2 mt-1'}/>
            <div className={'flex flex-wrap justify-between'}>
                <div className={'w-full md:w-6/12 mb-5 md:mb-0'}>
                    <GameCard title="Red Dead Redamption" statusText="CRACKED" image="https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg" className="mx-1 md:mx-2"
                              size="large" days="364"/>
                </div>
                <div className="w-full md:w-6/12 grid grid-cols-[1fr_1fr] px-1 gap-2">
                    <GameCard title="FIFA 22" statusText="UNCRACKED" image="https://cdn.akamai.steamstatic.com/steam/apps/1506830/header.jpg" days="14"/>
                    <GameCard title="Cyberpunk 2077" statusText="CRACKED" image="https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?" days="5"/>
                    <GameCard title="Elden Ring" statusText="CRACKED" image="https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg" days="66"/>
                    <GameCard title="TEKKEN 8" statusText="UNRELEASED" image="https://cdn.akamai.steamstatic.com/steam/apps/1778820/header.jpg" days="17"/>
                    <GameCard/>
                    <GameCard/>
                </div>

            </div>


        </div>
    )
}

export default Home