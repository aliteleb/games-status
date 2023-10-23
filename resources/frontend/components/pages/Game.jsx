import React, {useEffect} from 'react'
import Comment from '../partials/Comment'

function Game() {

    let [count, setCount] = React.useState(0)

    let increaseCount = ()=> {
        setCount(count = count + 1)
    }

    let decreaseCount = ()=> {
        setCount(count = count - 1)
    }

    useEffect(() => {
        const body = document.body,
            html = document.documentElement;
        const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const footerHeight = document.getElementsByTagName('footer')[0].offsetHeight;
        document.getElementById('blurred-bg').style.height = height + 'px';
        console.log(height);
    }, []);

    return (
        <>
            <div id="blurred-bg" className="w-full h-screen absolute top-0 left-0 overflow-hidden">
                <img className="opacity-30 top-0 w-full h-screen" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-[100%] w-full h-screen -scale-y-100" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-0 w-full h-screen" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-[100%] w-full h-screen -scale-y-100" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-0 w-full h-screen" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-[100%] w-full h-screen -scale-y-100" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-0 w-full h-screen" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-[100%] w-full h-screen -scale-y-100" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-0 w-full h-screen" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>
                <img className="opacity-30 top-[100%] w-full h-screen -scale-y-100" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt="bg"/>

                <div className="absolute top-[4rem] w-full h-[200%] -translate-x-1/2 left-1/2 backdrop-blur-xl z-0"/>
            </div>

            <div className='flex relative z-20 text-gray-300 border-t-[5px] border-uncracked h-[22rem] shadow-lg overflow-hidden'>
                <img className='absolute w-full h-full z-[-1] object-cover opacity-70' src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg"
                     style={{aspectRatio: '1920/620'}}
                     alt=""/>
                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" alt=""/>
                <div className='flex w-full items-center justify-between bg-black/80 py-3 px-5'>
                    <div>
                        <div>
                            <div className='flex justify-between'>
                                <div className='text-lg text-white/40 font-extralight mr-2'>STATUS</div>
                                <div className='text-lg text-uncracked'>316 DAYS AND COUNTING</div>
                            </div>
                            <div className='text-[3.5rem] rounded text-uncracked font-bold text-center -mt-5'>UNCRACKED</div>
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
                        <div className='text-3xl'>FOLLOWERS</div>
                        <div className='my-2 text-2xl'>105,297</div>
                        <div className="flex flex-wrap justify-center py-2 rounded ">
                            <input
                                type='checkbox'
                                className="mx-4 before:ring-4 before:ring-gray-700 before:hover:ring-4 before:hover:bg-gray-700/70 before:checked:bg-gray-700 before:hover:checked:bg-gray-700 relative"/>
                            <span className="text-xl">Follow</span>
                        </div>

                    </div>
                </div>
            </div>

            <section className="bg-black/50 py-8 lg:py-16 antialiased relative z-20">
                <div className="px-4 pb-36">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-300">
                            Comments (20)
                        </h2>
                    </div>
                    <form className="mb-6">
                        <div className="border-gray-400 py-2 px-4 mb-4 rounded-lg rounded-t-lg border">
                            <label htmlFor="comment" className="sr-only">
                                Your comment
                            </label>
                            <textarea
                                id="comment"
                                rows={6}
                                className="bg-transparent resize-none px-0 w-full text-md min-h-[6.2rem] border-0 focus:ring-0 focus:outline-none text-gray-200"
                                placeholder="Write a comment..."
                                required=""
                                defaultValue={""}
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-sm transition font-medium text-center text-gray-300 hover:bg-red-600 bg-red-700 rounded-lg"
                        >
                            Post comment
                        </button>
                    </form>
                    <Comment count={count} increaseCount={increaseCount} decreaseCount={decreaseCount}/>
                    <Comment count={count} increaseCount={increaseCount} decreaseCount={decreaseCount}/>
                    <Comment count={count} increaseCount={increaseCount} decreaseCount={decreaseCount}/>
                </div>
            </section>
        </>
    )
}

export default Game
