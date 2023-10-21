import React from 'react'

function Game() {
  return (
    <div className='container'>
        <div className='flex relative text-gray-300 border-t-4 border-red-700'>
            <img className='absolute w-full h-[372px] z-[-1]' src="https://img.opencritic.com/game/3717/N0uNpDGJ.jpg" alt="" />
            <img src="https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg" alt="" />  
            <div className='flex w-full items-center justify-between bg-gray-900/70 py-3 px-5 rounded'>
                <div>
                    <div>
                        <div className='flex justify-between'>
                            <div className='text-xl '>Status</div>
                            <div className='text-lg text-red-700'>316 DAYS AND COUNTING</div>
                        </div>
                        <div className='mt-3 text-[45px] rounded text-red-700 font-bold border-4 border-red-700 p-2 text-center'>UNCRACKED</div>
                    </div>
                    <div className='w-full mt-7'>
                            <div className='text-gray-400'>Game</div>
                            <div className='text-gray-100 text-xl'>RED DEAD REDEMPTION 2</div>
                    </div>
                    <div className='grid grid-cols-2 justify-between'>
                        <div className='mt-5'>
                            <div className='text-gray-400'>RELEASE DATE</div>
                            <div className='text-xl'>NOV 05, 2019</div>
                        </div>
                        <div className='mt-5'>
                            <div className='text-gray-400'>DRM PROTECTION</div>
                            <div className='text-xl'>ROCKSTAR</div>
                        </div>
                        <div className='mt-5'>
                            <div className='text-gray-400'>CRACK DATE</div>
                            <div className='text-xl'>TBD</div>
                        </div>
                        <div className='mt-5'>
                            <div className='text-gray-400'>SCENE GROUP</div>
                            <div className='text-xl'>TBD</div>
                        </div>
                    </div>
                </div>

                <div className=' text-center'>empty</div>
                <div>
                    <div className='text-xl'>FOLLOWERS</div>
                    <div className='my-2 text-3xl'>105297</div>
                    <button class="bg-red-500 transition hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Button
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Game