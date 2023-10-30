import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import Comment from '../partials/Comment'
import ApiClient from '../../services/ApiClient'
import Skeleton from 'react-loading-skeleton';
import {toast} from 'react-hot-toast';
import {RiSendPlane2Fill} from 'react-icons/ri'
import CommentPlaceholder from "../layouts/CommentPlaceholder.jsx";
import BlurredBackground, {refreshPageSize} from "../core/BlurredBackground.jsx";
import {AiOutlineDollarCircle} from 'react-icons/ai'
import {MdOutlineStarRate} from 'react-icons/md'
import {LiaCommentSolid} from 'react-icons/lia'

function Game() {

    const {slug} = useParams()

    let [createComment, setCreateComment] = React.useState({
        comment_value: "",
    })
    let [comments, setComments] = React.useState([])
    let [loading, setLoading] = React.useState(false)

    let [game, setGame] = React.useState({})

    let [follow, setFollow] = React.useState(false)

    useEffect(() => {

        const fetchGame = () => {
            ApiClient().get(`/game/${slug}`)
                .then(res => {
                    setGame(res.data.data)
                    setComments(res.data.data.comments)
                    setFollow(res.data.data.is_following)
                })
                .catch(err => console.log('Failed to get data', err))
        }

        fetchGame();
        setInterval(fetchGame, 30000);

    }, []);
    refreshPageSize()

    let handleChange = (e) => {
        setCreateComment(prevComment => ({
            ...prevComment,
            [e.target.name]: e.target.value
        }))
    }

    game.status_color = game?.status_text ? game?.status_text.toLowerCase() : 'gray-600'
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

    let handleSubmit = (e) => {
        if (loading) {
            return ""
        }
        e.preventDefault()

        setLoading(true)
        ApiClient().post(`/comments/create`, {
            'slug': slug,
            'body': createComment.comment_value
        })
            .then(res => {
                setLoading(false)
                setComments(res.data.data)
                setCreateComment({comment_value: ""})

                refreshPageSize()
            })
            .catch(err => {
                setLoading(false)
                let message = err.response.data.message
                if (Array.isArray(err.response.data.data.body) && err.response.data.data.body.length > 0) {
                    message = err.response.data.data.body[0]
                }
                toast.error(message)
                console.log(err)
            })
    }

    const handleFollowChange = async () => {
        const newFollowState = !follow;
        setFollow(newFollowState);

        const action = newFollowState ? 'follow' : 'unfollow';

        ApiClient()
            .post(`/games/${game.id}/${action}`)
            .then((response) => {
                if (response.data.status === "success") {
                    action === "follow" ? toast.success(response.data.message) : toast(response.data.message)
                    setGame(prevGame => (
                        {
                            ...prevGame,
                            followers_count: response.data.data.followers_count
                        }
                    ))
                } else {
                    setFollow((prevFollow) => !prevFollow);
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                setFollow((prevFollow) => !prevFollow);
                toast.error(error.response.data.message);
            });
    };

    return (
        <>
            <BlurredBackground image={game.cover}/>

            <div>
                <div className={`flex relative z-20 text-gray-300 border-t-[5px] border-${game.status_color} shadow-lg overflow-hidden`}
                     style={{boxShadow: 'rgb(0, 0, 0) 0px 0px 10px'}}>
                    <img className={`absolute w-full h-full z-[-1] object-cover`} src={game.cover && game.cover}
                         style={{aspectRatio: '1920/620'}}
                         alt=""/>

                    <div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[250px_2fr_1fr] w-full bg-black/80 justify-items-center'>
                        <img className={`col-span-2 sm:col-auto w-full object-cover h-[22rem] ${game.poster && 'animate-fade-in'}`}
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
                                        {game.protections?.map((drm, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                                    to={`/protection/${drm.slug}`}>{drm.name}</Link>)}
                                        {game.protections?.length === 0 &&
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
                                        {game.groups?.map((group, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                                 to={`/group/${group.slug}`}>{group.name}</Link>)}
                                        {game.groups?.length === 0 && <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>}
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
                                    checked={follow}
                                    onChange={handleFollowChange}
                                    type='checkbox'
                                    className={`mx-4 w-32 h-9 appearance-none border border-red-700 cursor-pointer transition rounded-full after:font-extrabold before:h-full pt-1 pl-2 hover:bg-red-700 relative after:absolute after:top-[20%] after:left-2 checked:after:content-['✓'] checked:bg-red-700 checked:border-red-700 before:block before:text-center checked:before:content-['Following'] before:content-['Follow'] ${game.is_following ?? "hidden"}`}/>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='flex w-full gap-x-4 mt-4'>
                    <div className='w-1/3 bg-black/30 rounded h-14 text-gray-300 flex items-center justify-between px-3 hover:bg-black/40 transition'>
                        <AiOutlineDollarCircle className='w-16 h-8 text-gray-300'/>
                        PRICE
                        <span>70$</span>
                    </div>
                    <div className='w-1/3 bg-black/30 rounded h-14 text-gray-300 flex items-center justify-between px-3 hover:bg-black/40 transition'>
                        <MdOutlineStarRate className='w-16 h-8 text-gray-300'/>
                        METACRITIC
                        <span>94</span>
                    </div>
                    <a href='#co' className='w-1/3 bg-black/30 rounded h-14 text-gray-300 flex items-center justify-between px-3 hover:bg-black/40 transition cursor-pointer'>
                        <LiaCommentSolid className='w-16 h-8 text-gray-300'/>
                        COMMENTS
                        <span>{comments.length}</span>
                    </a>
                </div>

                <section id="co" className="bg-black/50 py-8 lg:py-16 mt-4 antialiased relative z-20">
                    <div className="px-4 pb-36">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-300">
                                Comments ({comments.length})
                            </h2>
                        </div>
                        <div className="mb-6">
                            <form onSubmit={handleSubmit} className='block relative '>
                                <input type="text"
                                       autoComplete='one-time-code'
                                       name='comment_value'
                                       value={createComment.comment_value}
                                       id="comment"
                                       className="bg-transparent w-full text-md h-16 transition ring-1 ring-gray-400/50 focus:ring-gray-400 focus:outline-none text-gray-200 pl-4 pr-12 mb-4 rounded-md "
                                       placeholder="Your comment ..."
                                       required=""
                                       onChange={handleChange}
                                />
                                <RiSendPlane2Fill onClick={handleSubmit}
                                                  className=' mb-4 absolute top-[1.2rem] right-[1rem] text-gray-400 hover:text-gray-300 transition cursor-pointer'
                                                  style={{fontSize: "25px"}}/>
                            </form>

                        </div>
                        <div>
                            {comments.map(comment => {
                                return (
                                    <Comment setComments={setComments} key={comment.id} info={comment} replies={comment.replies} className="border-b border-gray-500 animate-slide-down-slow"/>
                                )
                            })}

                            {!game.name  &&
                                <>
                                    <CommentPlaceholder/>
                                    <CommentPlaceholder/>
                                </>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Game
