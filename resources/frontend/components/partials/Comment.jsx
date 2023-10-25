import React, {useEffect} from 'react'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import Skeleton from "react-loading-skeleton";
import ApiClient from '../../services/ApiClient'
import {toast} from 'react-hot-toast';

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
        e.preventDefault();
        setLoading(true);

        let formData = new FormData(formRef.current);

        ApiClient().post(`/comments/create`, formData)
            .then((res) => {
                setLoading(false);
                toast.success(res.data.message);
                setReplyInput({body: ""});
                props.setComments(res.data.data);
                setReplyForm(!replyForm);

                setTimeout(()=>{
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

    return (
        <div className='border-b-2 border-gray-500'>
            <article className="p-6 text-base rounded-lg">
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
                    <div className="z-10 w-36 bg-black/20 rounded divide-y shadow absolute mt-[140px]" style={{right: '10px'}}>
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
                                className={`${comment?.voted === "up" ? "text-green-700" : ""} cursor-pointer hover:text-opacity-60 text-2xl text-gray-300`}
                            >
                                <IoIosArrowUp/>
                            </button>
                            <div
                                className={`min-w-[2.7rem] font-bold flex justify-center my-2 ${comment?.votes > 0 ? 'text-green-600' : comment?.votes === 0 ? 'text-gray-300' : 'text-red-700'}`}>{comment?.votes}
                            </div>
                            <button
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
                                    setTimeout(()=>{
                                        document.getElementById('reply_input_'+comment.id).focus();
                                    }, 50);
                                }} type="button"
                                        className="flex items-center text-sm text-gray-500 hover:text-gray-400 hover:underline y-400 font-medium">
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

            </article>
            {(comment?.replies?.length > 0) &&
                comment.replies.map((reply, index) => {
                    return <article key={index} className="px-6 pb-4 mb-3 ml-6 lg:ml-12 text-base rounded-lg">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-200 font-semibold">
                                    <img className="mr-2 w-6 h-6 rounded-full"
                                         src={reply?.user_image ? reply?.user_image : "https://t4.ftcdn.net/jpg/04/43/35/29/240_F_443352949_1eX3IagFInYtf3d3tkXDSQkymM2HfSXq.jpg"}
                                         alt={reply?.username}/>
                                    {reply?.username && reply.username}
                                    {!(reply?.username) &&
                                        <Skeleton width={'5rem'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                                    }
                                </p>
                                <p className="text-xs text-gray-400">
                                    {reply?.time && reply.time}
                                    {!(reply?.time) &&
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
                            <div className="z-10 w-36 bg-black/20 rounded divide-y shadow absolute mt-[140px]" style={{right: '10px'}}>
                                <ul className="py-1 text-sm text-gray-300 y-200">
                                    <li><a href="#" className="block py-2 px-4 transition hover:bg-black/30">Edit</a></li>
                                    <li><a href="#" className="block py-2 px-4 transition hover:bg-black/30">Remove</a></li>
                                    <li><a href="#" className="block py-2 px-4 transition hover:bg-black/30">Report</a></li>
                                </ul>
                            </div>
                        </footer>
                        <div className='flex items-center'>
                            {reply?.votes !== null &&
                                <div className='flex flex-col items-center'>
                                    <button
                                        className={`${reply?.voted === "up" ? "text-green-700" : ""} cursor-pointer hover:text-opacity-60 text-2xl text-gray-300`}
                                    >
                                        <IoIosArrowUp/>
                                    </button>
                                    <div
                                        className={`min-w-[2.7rem] font-bold flex justify-center my-2 ${reply?.votes > 0 ? 'text-green-600' : reply?.votes === 0 ? 'text-gray-300' : 'text-red-700'}`}>{reply?.votes}
                                    </div>
                                    <button
                                        className={`${reply?.voted === "down" ? "text-red-700" : ""} cursor-pointer hover:text-opacity-60 text-2xl text-gray-300`}>
                                        <IoIosArrowDown/>
                                    </button>
                                </div>
                            }
                            {(reply?.votes == null) &&
                                <Skeleton width={'2rem'} height={'6rem'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={10}/>
                            }
                            <div>
                                <p className="mx-6 text-gray-400 w-[9rem] sm:w-[20rem] md:w-[30rem] max-w-[65rem]">
                                    {reply?.body && reply.body}
                                    {!(reply?.body) &&
                                        <Skeleton count={3} width={'100%'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                                    }
                                </p>
                                <div className="mx-6 flex items-center mt-4 space-x-4">
                                    {reply?.body &&
                                        <button type="button" className="flex items-center text-sm text-gray-500 hover:underline y-400 font-medium">
                                            <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                            </svg>
                                            Reply
                                        </button>
                                    }
                                    {!(reply?.body) &&
                                        <Skeleton width={'4rem'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                                    }

                                </div>
                            </div>
                        </div>
                    </article>
                })
            }

            {replyForm &&
                <form onSubmit={handleReplySubmit} ref={formRef} className="ml-20 flex flex-wrap w-full -mt-5">
                        <div className="block mb-2 text-sm font-medium text-gray-300 w-full">
                            to <span className='text-gray-400 text-sm underline'>{comment.username}</span>
                        </div>
                        <input
                            onChange={handleChange}
                            name='body'
                            value={replyInput.body}
                            type="text"
                            autoComplete='one-time-code'
                            id={`reply_input_${comment.id}`}
                            className="bg-transparent w-2/3 text-md h-10 transition ring-1 ring-gray-400/50 focus:ring-gray-400 focus:outline-none text-gray-200 px-4 pr-[10rem] mb-4 mt-2 rounded-md"
                        />
                        <input type="hidden" name='reply_to' value={comment.id}/>
                    <button
                        className={`transition text-gray-300 hover:text-white h-10 w-[8.8rem] self-center md:ml-[-8.8rem] md:border-l md:border-0 border border-gray-400/50 hover:bg-gray-800/60 focus:outline-none font-medium rounded-lg md:rounded-r-lg text-sm px-5 md:py-2.5 text-center mb-2 ${loading ? 'disabled:bg-transparent disabled:text-[#bababa] disabled:cursor-not-allowed hover:bg-[#282c39]' : ''}`}
                        disabled={loading}>

                        {loading ?
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </> : <>Send</>
                        }
                    </button>
                </form>
            }
        </div>
    )
}

export default Comment
