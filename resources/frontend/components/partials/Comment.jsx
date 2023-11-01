import React, {useEffect} from 'react'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import Skeleton from "react-loading-skeleton";
import ApiClient from '../../services/ApiClient'
import {toast} from 'react-hot-toast';
import {RiSendPlane2Fill} from 'react-icons/ri'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {GoReport} from 'react-icons/go'
import {CiCircleRemove} from 'react-icons/ci'
import {useAuth} from "../api/AuthContext";
import {refreshPageSize} from "../core/BlurredBackground.jsx";
import {Link} from 'react-router-dom';

function Comment(props) {

    const {user} = useAuth();
    let [comment, setComment] = React.useState(null);
    let [replies, setReplies] = React.useState([]);
    let [mention, setMention] = React.useState(null)
    let [replyForm, setReplyForm] = React.useState(false)
    let [replyTo, setReplyTo] = React.useState(null)
    let [loading, setLoading] = React.useState(false)
    let [replyInput, setReplyInput] = React.useState({
        body: "",
    })

    useEffect(() => {
        setComment(props.info)
        if (props.replies)
            setReplies(props.replies)

    })
    refreshPageSize()

    let formRef = React.useRef(null)

    let handleReplySubmit = (e) => {
        if (loading) return "";

        e.preventDefault();
        setLoading(true);

        let formData = new FormData(formRef.current);

        let reply_to = formData.get('reply_to');
        if (replyTo)
            reply_to = replyTo;

        setLoading(true)
        ApiClient().post(`/comments/create`, {
            slug: formData.get('slug'),
            body: formData.get('body'),
            reply_to: reply_to,
        })
            .then((res) => {
                setLoading(false);
                setReplyInput({body: ""});
                props.setComments(res.data.data);
                setReplyForm(!replyForm);
            })
            .catch((err) => {
                setLoading(false);
                let message = "An error occurred.";
                if (err.response && err.response.data) {
                    if (Array.isArray(err.response.data.data.body) && err.response.data.data.body.length > 0) {
                        message = err.response.data.data.body[0];
                    } else {
                        message = err.response.data.message;
                    }
                }
                toast.error(message);
            });
    }


    let handleChange = (e) => {
        setReplyInput(prevReplyInput => ({
            ...prevReplyInput,
            [e.target.name]: e.target.value
        }))
    }

    let handleVote = (vote) => {

        if (loading) return;

        let oldComment = comment

        ApiClient().post('/comment/vote', {
            id: comment.id,
            vote: vote,
        })
            .then(res => {
                props.setComments(res.data.data)
            })
            .catch(err => {
                setComment(oldComment)
                toast.error(err.response.data.message);
            })
    }

    let showDropMenu = React.useRef(null)

    let toggleClass = () => {
        showDropMenu.current.classList.toggle("hidden");
    }

    let removeComment = () => {
        ApiClient().delete("/comment/delete/" + comment.id)
            .then(res => {
                props.setComments(res.data.data)
                toast.success(res.data.message)
                refreshPageSize()
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })

        toggleClass()
    }


    return (
        <div className={props.className}>
            <article className="rounded-lg text-base my-1 pb-1 group">
                <div className='grid grid-cols-[auto_1fr]'>
                    {comment?.votes !== null &&
                        <div className='flex flex-col items-center'>
                            <button
                                data-vote="up"
                                onClick={() => handleVote("up")}
                                className={`${comment?.voted === "up" ? "text-green-700" : ""} cursor-pointer hover:text-opacity-60 text-2xl text-gray-300`}
                            >
                                <IoIosArrowUp/>
                            </button>
                            <div
                                className={`min-w-[2.7rem] font-bold flex justify-center ${comment?.votes > 0 ? 'text-green-600' : comment?.votes === 0 ? 'text-gray-300' : 'text-red-700'}`}>{comment?.votes}
                            </div>
                            <button
                                data-vote="down"
                                onClick={() => handleVote("down")}
                                className={`${comment?.voted === "down" ? "text-red-700" : ""} cursor-pointer hover:text-opacity-60 text-2xl text-gray-300`}>
                                <IoIosArrowDown/>
                            </button>
                        </div>
                    }
                    {(comment?.votes == null) &&
                        <Skeleton width={'2rem'} height={'6rem'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={10}/>
                    }
                    <div className='w-full'>
                        <footer className="flex items-center justify-between">
                            <div className="mx-6 flex items-center">
                                <Link to={`/user/${comment?.username}`} className="mr-3 inline-flex cursor-pointer items-center text-sm font-semibold text-gray-200">
                                    <img className="mr-2 h-6 w-6 rounded-full"
                                         src={comment?.user_image ? comment?.user_image : "https://t4.ftcdn.net/jpg/04/43/35/29/240_F_443352949_1eX3IagFInYtf3d3tkXDSQkymM2HfSXq.jpg"}
                                         alt={comment?.username}/>
                                    {comment?.display_name && comment.display_name}
                                    {!(comment?.username) &&
                                        <Skeleton width={'5rem'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                                    }
                                </Link>
                                <p className="text-xs text-gray-400">
                                    {comment?.time && comment.time}
                                    {!(comment?.time) &&
                                        <Skeleton width={'6rem'} height={'12px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                                    }
                                </p>
                            </div>
                            <button onClick={toggleClass} onBlur={() => {
                                setTimeout(() => {
                                    showDropMenu.current.classList.add("hidden")
                                }, 100)
                            }} className="inline-flex items-center rounded p-2 text-center font-medium text-gray-300 text-md y-400 hover:text-gray-400" type="button">
                                <BiDotsHorizontalRounded fontSize="30px"/>
                            </button>
                            {/* Dropdown menu */}
                            <div ref={showDropMenu} onClick={removeComment}
                                 className={`hidden w-44 z-10 bg-black/20 rounded overflow-hidden divide-y shadow absolute mt-[90px] animate-slide-down`}
                                 style={{right: '10px'}}>
                                <ul className="text-sm text-gray-300 y-200">
                                    <li>
                                        <button disabled="disabled" className="flex w-full cursor-pointer items-center py-2 transition disabled:cursor-default disabled:opacity-50">
                                            <GoReport className='mx-2 text-lg'/>
                                            <span className='text-left text-md'>Report</span>
                                        </button>
                                    </li>
                                    {comment?.user?.username === user?.username &&
                                        <li><span className="flex cursor-pointer items-center py-2 transition hover:bg-black/30"><CiCircleRemove
                                            className='mx-2 text-lg'/> Remove</span></li>}
                                </ul>
                            </div>
                        </footer>
                        <div>
                            <p className="mx-6 break-words text-gray-300 w-[25rem] max-w-[65rem] md:w-[35rem] lg:w-[50rem]">
                                {comment?.mention && <span
                                    className="mr-2 rounded-full bg-gray-100 text-xs font-medium text-gray-800 px-2.5 py-0.5 dark:bg-gray-700 dark:text-gray-300">@{comment.mention}</span>}
                                {comment?.body && comment.body}
                                {!(comment?.body) &&
                                    <Skeleton count={3} width={'100%'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                                }
                            </p>
                            <div className="mx-6 mt-2 flex flex-col space-x-4">
                                {comment?.body &&
                                    <button onClick={() => {
                                        if (props.setReplyForm) {
                                            props.setReplyForm(true)
                                            props.setMention(comment.username)
                                            props.setReplyTo(comment.id)
                                            setTimeout(() => {
                                                document.getElementById('reply_input_' + props.parentComment.id).focus();
                                            }, 50);
                                        } else {
                                            setReplyForm(true);
                                            setMention(null) // comment.username
                                            setReplyTo(null)
                                            setTimeout(() => {
                                                document.getElementById('reply_input_' + comment.id).focus();
                                            }, 50);
                                        }
                                        refreshPageSize();

                                    }} type="button"
                                            className="flex items-center text-xs text-gray-500 hover:text-gray-400 opacity-0 group-hover:opacity-100">
                                        <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                        </svg>
                                        Reply
                                    </button>
                                }

                                {!(comment?.body) &&
                                    <Skeleton width={'4rem'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </article>
            {replies.length > 0 && replies.map((reply, index) => {
                return <Comment parentComment={comment} setReplyTo={setReplyTo} setMention={setMention} setReplyForm={setReplyForm} info={reply} key={index}
                                setComments={props.setComments} className="border-l-black/10 border-l-[3rem] animate-slide-down-slow"/>
            })}

            {replyForm &&
                <form onSubmit={handleReplySubmit} ref={formRef} className="ml-20 flex flex-wrap animate-slide-down">
                    <div className='relative flex w-full items-center'>
                        <input
                            onChange={handleChange}
                            name='body'
                            value={replyInput.body}
                            type="text"
                            autoComplete='one-time-code'
                            id={`reply_input_${comment.id}`}
                            placeholder='Your reply ...'
                            className={`bg-transparent w-full text-sm md:text-xs ${mention ? "h-[4.5rem]" : "h-10"} transition ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-gray-200 pl-4 pr-12 ${mention && "pt-6"} mb-4 mt-2 rounded-md`}
                        />
                        {mention && <span
                            className="absolute left-2 mr-2 rounded-full bg-gray-100 text-xs font-medium text-gray-800 top-[1rem] px-2.5 py-0.5 dark:bg-gray-700 dark:text-gray-300">@{mention}</span>}
                        <input type="hidden" name='reply_to' value={comment.id}/>
                        <RiSendPlane2Fill onClick={handleReplySubmit} className='relative mt-2 mb-4 cursor-pointer text-gray-400 transition right-[2rem] hover:text-gray-300'/>
                    </div>

                </form>
            }
        </div>
    )
}

export default Comment
