import React from 'react'
import GameCard from "../layouts/GameCard.jsx";

function Home() {
  return (
    <div className={'container'}>

        <div className={'flex flex-wrap justify-between mt-10'}>
            <div className={'w-6/12'}>
                <GameCard/>
            </div>
            <div className="w-6/12 grid grid-cols-2">
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