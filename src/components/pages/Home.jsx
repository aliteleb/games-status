import React from 'react'
import GameCard from "../layouts/GameCard.jsx";

function Home() {
  return (
    <div className={'container'}>
        <div className={'h-12'}/>
        <div className={'flex flex-wrap justify-between px-2 md:px-1'}>
            <div className={'text-white text-lg font-bold'}>Hot Games</div>
            <div className={'text-white text-sm'}><div className={'inline-block mx-1 w-[7px] h-[7px] bg-green-700 rounded-full animate-pulse'}></div>Live updates</div>
        </div>
        <div className={'h-[1px] bg-[#494a4f] mb-2 mt-1'}/>
        <div className={'flex flex-wrap justify-between'}>
            <div className={'w-full md:w-6/12'}>
                <GameCard/>
            </div>
            <div className="w-full md:w-6/12 grid grid-cols-2">
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
            </div>

        </div>


    </div>
  )
}

export default Home