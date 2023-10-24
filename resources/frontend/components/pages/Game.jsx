import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import Comment from '../partials/Comment'
import ApiClient from '../../services/ApiClient'
import Skeleton from 'react-loading-skeleton';

function Game() {

    const {slug} = useParams(null)

    let [count, setCount] = React.useState(0)
    let [game, setGame] = React.useState(
        {
            status_text: null,
            days_diff: null,
            image: null,
            is_following: null,
            status_long: null,
            status_color: null,
            poster: null,
            cover: null,
            name: null,
            release_date: null,
            protections: [],
            crack_date: null,
            scene_group: null,
            groups: [],
            followers_count: null
        }
    )

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


        const commentsContainer = document.getElementById('comments');
        if (commentsContainer) {
            const comments = commentsContainer.children;
            const lastComment = comments[comments.length - 1];
            lastComment.classList.remove('border-b-2')
        }

        ApiClient().get(`/game/${slug}`)
        .then(res => setGame(res.data.data))
        .catch(err => console.log('Failed to get data', err))



    }, []);


    let comments = document.getElementById('comments')

    game.status_color = game.status_text ? game.status_text.toLowerCase() : 'gray-600'
    let icon, days
    const statusText = game.status_text || ''

    switch (statusText) {
        case "CRACKED":
            game.status_long = `AFTER ${game.days_diff} DAYS`
            break
        case "UNCRACKED":
            game.status_long = `${game.days_diff} DAYS AND COUNTING`
            break
        default:
            break;
    }

    days = `D${statusText === "CRACKED" || statusText === "UNCRACKED" ? "+" : "-"}${game.days_diff}`;

    return (
        <>
            <div id="blurred-bg" className={`w-full h-screen absolute top-0 left-0 overflow-hidden`}>
                <img className={` top-0 w-full h-screen ${game.poster && 'fade30'} opacity-30`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-0 w-full h-screen ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-0 w-full h-screen ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-0 w-full h-screen ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-0 w-full h-screen ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.poster && 'fade30'}`} src={`${game.poster}`} alt="bg"/>

                <div className="absolute top-[4rem] w-full h-[200%] -translate-x-1/2 left-1/2 backdrop-blur-xl z-0"/>
            </div>

            <div>
                <div className={`flex relative z-20 text-gray-300  border-t-[5px] border-${game.status_color} shadow-lg overflow-hidden`}>
                    <img className={`absolute w-full h-full z-[-1] object-cover opacity-70`} src={`${game.cover}`}
                        style={{aspectRatio: '1920/620'}}
                        alt=""/>

                    <div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[250px_2fr_1fr] w-full bg-black/80 justify-items-center'>
                        <img className={`col-span-2 sm:col-auto w-full object-cover h-[22rem] ${game.poster && 'fade'}`}  src={game.poster? game.poster : '/assets/images/game-placeholder-vertical.jpg'} alt="" />
                        <div className="h-[22rem] w-full px-4 py-2 text-center sm:text-left">
                            <div className="grid grid-rows-[1fr_1fr] w-max mx-auto sm:mx-0 mt-2 sm:mt-0">
                                <div className='flex justify-between'>
                                    <div className='text-lg text-white/40 font-extralight'>{game.status_text && 'STATUS'}</div>
                                    <div className={`text-lg text-${game.status_color}`}>
                                        {game.status_long || <Skeleton height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                                    </div>
                                </div>
                                <div className={`text-${game.status_color} w-full text-[3rem] rounded font-bold -mt-[2rem]`}>
                                    {game.status_text || <Skeleton width={'20rem'} height={'30px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={'30px'}/>}
                                </div>
                            </div>
                            <div className='w-full my-5'>
                                <div className='text-[#dddddd99] font-extralight'>GAME</div>
                                <div className='text-xl'>
                                    {game.name || <Skeleton width={'90%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-y-4 justify-between'>
                                <div>
                                    <div className='text-[#dddddd99] font-extralight'>RELEASE DATE</div>
                                    <div className='text-xl'>
                                        {game.release_date || <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                    </div>
                                </div>
                                <div>
                                    <div className='text-[#dddddd99] font-extralight'>DRM PROTECTIONS</div>
                                    <div className='text-xl'>
                                        {game.protections.map(drm => <Link className="inline-block mx-1 transition hover:opacity-70" to={`/protection/${drm.slug}`} key={drm.id}>{drm.name}</Link>)}
                                        {game.protections.length === 0 && <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                    </div>
                                </div>
                                <div>
                                    <div className='text-[#dddddd99] font-extralight'>CRACK DATE</div>
                                    <div className='text-xl'>
                                        {game.crack_date || <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                    </div>
                                </div>
                                <div>
                                    <div className='text-[#dddddd99] font-extralight'>SCENE GROUPS</div>
                                    <div className='text-xl'>
                                        {game.groups.map(group => <Link className="inline-block mx-1 transition hover:opacity-70" to={`/group/${group.slug}`} key={group.id}>{group.name}</Link>)}
                                        {game.groups.length === 0 && <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center border-t md:border-0 border-gray-300 w-[80%] pt-3 md:col-span-1 col-span-2 m-auto'>
                            <div className='text-xl'>FOLLOWERS</div>
                            <div className='my-2 text-2xl'>
                                {game.name ? game.followers_count : <Skeleton width={'30%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
                            </div>
                            <div className="flex flex-wrap justify-center py-2 rounded ">
                                <input
                                    type='checkbox'
                                    className="mx-4 w-32 h-9 appearance-none border border-red-700 cursor-pointer transition rounded-full after:font-extrabold before:h-full pt-1 pl-2 hover:bg-red-700 relative after:absolute after:top-[20%] after:left-2 checked:after:content-['✓'] checked:bg-red-700 checked:border-red-700 before:block before:text-center checked:before:content-['Following'] before:content-['Follow']"/>
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
                            <button type="button" className="transition text-gray-300 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                Post comment
                            </button>

                        </form>
                        <div id='comments'>
                            <Comment count={count} increaseCount={increaseCount} decreaseCount={decreaseCount}/>
                            <Comment count={count} increaseCount={increaseCount} decreaseCount={decreaseCount}/>
                            <Comment count={count} increaseCount={increaseCount} decreaseCount={decreaseCount}/>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Game
