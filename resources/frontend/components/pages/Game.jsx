import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import Comment from '../partials/Comment'
import ApiClient from '../../services/ApiClient'
import Skeleton from 'react-loading-skeleton';
import {toast} from 'react-hot-toast';

function Game() {

    const {slug} = useParams(null)

    let [mainCommentLoading, setMainCommentLoading] = React.useState(false)
    let [createComment, setCreateComment] = React.useState({
        comment_value: "",
    })
    let [comments, setComments] = React.useState([])

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
            followers_count: null,
            comments: [],
        }
    )

    useEffect(() => {

        setTimeout(() => {
            const body = document.body,
                html = document.documentElement;
            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            // const footerHeight = document.getElementsByTagName('footer')[0].offsetHeight;
            document.getElementById('blurred-bg').style.height = height + 'px';

        }, 500)


        const fetchGame = () => {
            ApiClient().get(`/game/${slug}`)
                .then(res => {
                    setGame(res.data.data)
                    setComments(res.data.data.comments)

                    setTimeout(() => {
                        const body = document.body,
                            html = document.documentElement;
                        const height = Math.max(
                            body.scrollHeight,
                            body.offsetHeight,
                            html.clientHeight,
                            html.scrollHeight,
                            html.offsetHeight
                        );
                        document.getElementById('blurred-bg').style.height = height + 'px';

                    }, 50)
                })
                .catch(err => console.log('Failed to get data', err))
        }

        fetchGame();
        setInterval(fetchGame, 30000);

    }, []);


    let handleChange = (e) => {
        setCreateComment(prevComment => ({
            ...prevComment,
            [e.target.name]: e.target.value
        }))
    }

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


    let handleSubmit = (e) => {
        e.preventDefault()
        setMainCommentLoading(true)

        ApiClient().post(`/comments/create`, {
            'slug': slug,
            'body': createComment.comment_value
        })
            .then(res => {
                setMainCommentLoading(false)
                setComments(res.data.data)
                setCreateComment({comment_value: ""})

                setTimeout(() => {
                    const body = document.body,
                        html = document.documentElement;
                    const height = Math.max(
                        body.scrollHeight,
                        body.offsetHeight,
                        html.clientHeight,
                        html.scrollHeight,
                        html.offsetHeight
                    );
                    document.getElementById('blurred-bg').style.height = height + 'px';
                }, 50)
            })
            .catch(err => {
                setMainCommentLoading(false)
                let message = err.response.data.message
                if (Array.isArray(err.response.data.data.body) && err.response.data.data.body.length > 0) {
                    message = err.response.data.data.body[0]
                }
                toast.error(message)
                console.log(err)
            })
    }

    return (
        <>
            <div id="blurred-bg" className={`w-full h-screen absolute top-0 left-0 overflow-hidden`}>
                <img className={`opacity-30 top-0 w-full h-screen ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-0 w-full h-screen ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-0 w-full h-screen ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-0 w-full h-screen ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-0 w-full h-screen ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>
                <img className={`opacity-30 top-[100%] w-full h-screen -scale-y-100 ${game.cover && 'fade30'}`} src={game.cover && game.cover} alt="bg"/>

                <div className="absolute top-[4rem] w-full h-[200%] -translate-x-1/2 left-1/2 backdrop-blur-xl z-0"/>
            </div>

            <div>
                <div className={`flex relative z-20 text-gray-300 border-t-[5px] border-${game.status_color} shadow-lg overflow-hidden`} style={{boxShadow: '-3px 3px 10px #000'}}>
                    <img className={`absolute w-full h-full z-[-1] object-cover`} src={game.cover && game.cover}
                         style={{aspectRatio: '1920/620'}}
                         alt=""/>

                    <div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[250px_2fr_1fr] w-full bg-black/80 justify-items-center'>
                        <img className={`col-span-2 sm:col-auto w-full object-cover h-[22rem] ${game.poster && 'fade'}`}
                             src={game.poster ? game.poster : '/assets/images/game-placeholder-vertical.jpg'} alt=""/>
                        <div className="h-[22rem] w-full px-4 py-2 text-center sm:text-left">
                            <div className="grid grid-rows-[1fr_1fr] w-max mx-auto sm:mx-0 mt-2 sm:mt-0">
                                <div className='flex justify-between'>
                                    <div className='text-white/40 font-extralight'>{game.status_text && 'STATUS'}</div>
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
                                        {game.protections.map((drm, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                                    to={`/protection/${drm.slug}`}>{drm.name}</Link>)}
                                        {game.protections.length === 0 &&
                                            <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
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
                                        {game.groups.map((group, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                                 to={`/group/${group.slug}`}>{group.name}</Link>)}
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
                                Comments ({comments.length})
                            </h2>
                        </div>
                        <div className="mb-6">
                            <form onSubmit={handleSubmit}>
                                <input type="text"
                                       autoComplete='one-time-code'
                                       name='comment_value'
                                       value={createComment.comment_value}
                                       id="comment"
                                       className="bg-transparent w-full text-md h-16 transition ring-1 ring-gray-400/50 focus:ring-gray-400 focus:outline-none text-gray-200 px-4 mb-4 rounded-md "
                                       placeholder="Write a comment..."
                                       required=""
                                       onChange={handleChange}
                                />
                            </form>
                            <button onClick={handleSubmit} type="button"
                                    className={`transition text-gray-300 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${mainCommentLoading ? 'disabled:bg-black/20  disabled:border-black/10 dsiabled:text-[#bababa] disabled:cursor-not-allowed hover:bg-[#282c39]' : ''}`}
                                    disabled={mainCommentLoading}
                            >
                                {mainCommentLoading ?
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </> : <>Post Comment</>
                                }
                            </button>

                        </div>
                        <div id='comments'>
                            {comments.map(comment => {
                                return (
                                    <Comment setComments={setComments} key={comment.id} info={comment}/>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Game
