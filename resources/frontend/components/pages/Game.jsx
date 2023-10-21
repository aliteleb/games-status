import React from 'react'

function Game() {
    return (
        <>
            <div className='flex relative text-gray-300 border-t-[5px] border-uncracked h-[22rem] shadow-lg overflow-hidden rounded-br-md rounded-bl-md'>
                <img className='absolute w-full h-full z-[-1] object-cover opacity-70' src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg"
                     style={{aspectRatio: '1920/620'}}
                     alt=""/>
                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt=""/>
                <div className='flex w-full items-center justify-between bg-black/80 py-3 px-5'>
                    <div>
                        <div>
                            <div className='flex justify-between'>
                                <div className='text-lg text-white/40 font-extralight'>STATUS</div>
                                <div className='text-lg text-red-600'>316 DAYS AND COUNTING</div>
                            </div>
                            <div className='text-[3.5rem] rounded text-red-600 font-bold text-center -mt-5'>UNCRACKED</div>
                        </div>
                        <div className='w-full my-5'>
                            <div className='text-[#dddddd99] font-extralight'>GAME</div>
                            <div className='text-gray-100 text-xl'>RED DEAD REDEMPTION 2</div>
                        </div>
                        <div className='grid grid-cols-2 gap-y-4 justify-between'>
                            <div>
                                <div className='text-[#dddddd99] font-extralight'>RELEASE DATE</div>
                                <div className='text-xl text-gray-100'>NOV 05, 2019</div>
                            </div>
                            <div>
                                <div className='text-[#dddddd99] font-extralight'>DRM PROTECTION</div>
                                <div className='text-xl text-gray-100'>ROCKSTAR</div>
                            </div>
                            <div>
                                <div className='text-[#dddddd99] font-extralight'>CRACK DATE</div>
                                <div className='text-xl'>TBD</div>
                            </div>
                            <div>
                                <div className='text-[#dddddd99] font-extralight'>SCENE GROUP</div>
                                <div className='text-xl'>TBD</div>
                            </div>
                        </div>
                    </div>

                    <div className='text-center'>AD1</div>
                    <div className='text-center'>AD2</div>
                    <div className='text-center'>AD3</div>
                    <div className='text-center'>
                        <div className='text-xl'>FOLLOWERS</div>
                        <div className='my-2 text-3xl'>105297</div>
                        <button className="bg-red-500 transition hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Follow
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-[20rem]"/>
        </>
    )
}

export default Game
