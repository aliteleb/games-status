import React, {useEffect} from 'react'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import Skeleton from "react-loading-skeleton";
import ApiClient from '../../services/ApiClient'
import {toast} from 'react-hot-toast';
import {RiSendPlane2Fill} from 'react-icons/ri'

function Comment(props) {

    let [comment, setComment] = React.useState(null);
    let [replyForm, setReplyForm] = React.useState(false)
    let [loading, setLoading] = React.useState(false)
    let [replyInput, setReplyInput] = React.useState({
        body: "",
    })

    useEffect(() => {
        setComment(props.info)
    })

    let formRef = React.useRef(null)

    let handleReplySubmit = (e) => {
        if (loading) return "";

        e.preventDefault();
        setLoading(true);

        let formData = new FormData(formRef.current);

        setLoading(true)
        ApiClient().post(`/comments/create`, formData)
            .then((res) => {
                setLoading(false);
                setReplyInput({body: ""});
                props.setComments(res.data.data);
                setReplyForm(!replyForm);

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
                console.log(err);
            });
    }


    let handleChange = (e) => {
        setReplyInput(prevReplyInput => ({
            ...prevReplyInput,
            [e.target.name]: e.target.value
        }))
    }

    let handleVote = (e) => {

        if (loading) return;

        let id = e.currentTarget.getAttribute("data-id")
        let vote = e.currentTarget.getAttribute("data-vote")

        let oldComment = {...comment}

        ApiClient().post('/comment/vote', {
            id: id,
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

    return (
        <div className={props.className}>
            <article className="p-4 text-base rounded-lg">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-200 font-semibold">
                            <img className="mr-2 w-6 h-6 rounded-full"
                                 src={comment?.user_image ? comment?.user_image : "https://t4.ftcdn.net/jpg/04/43/35/29/240_F_443352949_1eX3IagFInYtf3d3tkXDSQkymM2HfSXq.jpg"}
                                 alt={comment?.username}/>
                            {comment?.username && comment.username}
                            {!(comment?.username) &&
                                <Skeleton width={'5rem'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                            }
                        </p>
                        <p className="text-xs text-gray-400">
                            {comment?.time && comment.time}
                            {!(comment?.time) &&
                                <Skeleton width={'6rem'} height={'12px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                            }
                        </p>
                    </div>
                    <button className="inline-flex items-center p-2 text-md font-medium text-center text-gray-300 hover:text-gray-400 y-400 rounded" type="button">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div className="hidden z-10 w-36 bg-black/20 rounded divide-y shadow absolute mt-[140px]" style={{right: '10px'}}>
                        <ul className="py-1 text-sm text-gray-300 y-200">
                            <li><a href="#" className="block py-2 px-4 transition hover:bg-black/30">Edit</a></li>
                            <li><a href="#" className="block py-2 px-4 transition hover:bg-black/30">Remove</a></li>
                            <li><a href="#" className="block py-2 px-4 transition hover:bg-black/30">Report</a></li>
                        </ul>
                    </div>
                </footer>
                <div className='flex items-center'>
                    {comment?.votes !== null &&
                        <div className='flex flex-col items-center'>
                            <button
                                data-id={comment?.id}
                                data-vote="up"
                                onClick={handleVote}
                                className={`${comment?.voted === "up" ? "text-green-700" : ""} cursor-pointer hover:text-opacity-60 text-2xl text-gray-300`}
                            >
                                <IoIosArrowUp/>
                            </button>
                            <div
                                className={`min-w-[2.7rem] font-bold flex justify-center my-2 ${comment?.votes > 0 ? 'text-green-600' : comment?.votes === 0 ? 'text-gray-300' : 'text-red-700'}`}>{comment?.votes}
                            </div>
                            <button
                                data-id={comment?.id}
                                data-vote="down"
                                onClick={handleVote}
                                className={`${comment?.voted === "down" ? "text-red-700" : ""} cursor-pointer hover:text-opacity-60 text-2xl text-gray-300`}>
                                <IoIosArrowDown/>
                            </button>
                        </div>
                    }
                    {(comment?.votes == null) &&
                        <Skeleton width={'2rem'} height={'6rem'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={10}/>
                    }
                    <div>
                        <p className="mx-6 text-gray-400 w-[9rem] sm:w-[20rem] md:w-[30rem] max-w-[65rem]">
                            {comment?.body && comment.body}
                            {!(comment?.body) &&
                                <Skeleton count={3} width={'100%'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                            }
                        </p>
                        <div className="mx-6 flex flex-col mt-4 space-x-4">
                            {comment?.body &&
                                <button onClick={() => {
                                    setReplyForm(!replyForm);
                                    setTimeout(() => {
                                        document.getElementById('reply_input_' + comment.id).focus();
                                    }, 50);
                                }} type="button"
                                        className="flex items-center text-sm text-gray-500 hover:text-gray-400 hover:underline y-400 font-medium">
                                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
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

            </article>
            {comment?.replies?.length > 0 && comment.replies.map((reply, index) => (
                <Comment info={reply} key={index} setComments={props.setComments} className="pl-16"/>
            ))}

            {replyForm &&
                <form onSubmit={handleReplySubmit} ref={formRef} className="ml-20 flex flex-wrap">
                    <div className="block text-sm font-medium text-gray-300 w-full">
                        to <span className='text-gray-400 text-sm underline'>{comment.username}</span>
                    </div>
                    <div className='flex items-center w-full'>
                        <input
                            onChange={handleChange}
                            name='body'
                            value={replyInput.body}
                            type="text"
                            autoComplete='one-time-code'
                            id={`reply_input_${comment.id}`}
                            placeholder='Your comment ...'
                            className="bg-transparent w-full text-sm md:text-xs h-10 transition ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-gray-200 px-4 pr-[10rem] mb-4 mt-2 rounded-md"
                        />
                        <input type="hidden" name='reply_to' value={comment.id}/>
                        <RiSendPlane2Fill onClick={handleReplySubmit} className='mb-4 mt-2 relative right-[2rem] text-gray-400 hover:text-gray-300 transition cursor-pointer'/>
                    </div>

                </form>
            }
        </div>
    )
}

export default Comment
