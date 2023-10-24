import React, {useEffect} from 'react'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import Skeleton from "react-loading-skeleton";

function Comment(props) {

    let [comment, setComment] = React.useState(null);

    useEffect(() => {
        setComment({
            username: 'Michael Gough',
            user_image: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
            body: 'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.',
            time: '5 minutes ago',
            likes: 15,
            dislikes: 3,
            votes: 12,
            voted: "down",
            replies: [
                {
                    username: 'Jese Leos',
                    user_image: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
                    body: 'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.',
                    time: '2 minutes ago',
                    likes: 0,
                    dislikes: 2,
                    votes: -2,
                    voted: "down"
                },
                {
                    username: 'Ahmed Samir',
                    user_image: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
                    body: 'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.',
                    time: '20 seconds ago',
                    likes: 5,
                    dislikes: 2,
                    votes: 3,
                    voted: null
                },
            ]
        })
    }, [])

    return (
        <div className='border-b-2 border-gray-500'>
            <article className="p-6 text-base rounded-lg">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-200 font-semibold">
                            {(comment?.user_image && comment?.username) &&
                                <img className="mr-2 w-6 h-6 rounded-full" src={comment.user_image} alt={comment.username}/>
                            }
                            {!(comment?.user_image) &&
                                <Skeleton width={'1.5rem'} height={'1.5rem'} className="mr-2" circle={true} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={0}/>
                            }
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
                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-md font-medium text-center text-gray-300 hover:text-gray-400 y-400 rounded" type="button">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                        <ul className="py-1 text-sm text-gray-700 y-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Edit</a></li>
                            <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Remove</a></li>
                            <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Report</a></li>
                        </ul>
                    </div>
                </footer>
                <div className='flex items-center'>
                    {comment?.votes &&
                        <div className='flex flex-col items-center'>
                            <button
                            className={`${comment.voted === "up" ? "text-green-700 hover:text-green-700" : ""} cursor-pointer hover:text-gray-500  text-2xl text-gray-300`}  
                            >
                                <IoIosArrowUp/>
                            </button>
                            <div
                                className={`min-w-[2.7rem] font-bold flex justify-center my-2 ${comment.votes > 0 ? 'text-green-600' : comment.votes === 0 ? 'text-gray-300' : 'text-red-700'}`}>{comment.votes}
                            </div>
                            <button
                            className={`${comment.voted === "down" ? "text-red-700 hover:text-red-700" : ""} cursor-pointer hover:text-gray-500  text-2xl text-gray-300`}>
                                <IoIosArrowDown />
                            </button>
                        </div>
                    }
                    {!(comment?.votes) &&
                        <Skeleton width={'2rem'} height={'6rem'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={10}/>
                    }
                    <div>
                        <p className="mx-6 text-gray-400 w-[9rem] sm:w-[20rem] md:w-[30rem] max-w-[65rem]">
                            {comment?.body && comment.body}
                            {!(comment?.body) &&
                                <Skeleton count={3} width={'100%'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                            }
                        </p>
                        <div className="mx-6 flex items-center mt-4 space-x-4">
                            {comment?.body &&
                                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline y-400 font-medium">
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
            {(comment?.replies.length > 0) &&
                comment.replies.map((reply) => {
                    return <article className="px-6 pb-4 mb-3 ml-6 lg:ml-12 text-base rounded-lg">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-200 font-semibold">
                                    {(reply?.user_image && reply?.user_image) &&
                                        <img className="mr-2 w-6 h-6 rounded-full" src={reply.user_image} alt={reply.username}/>
                                    }
                                    {!(reply?.user_image) &&
                                        <Skeleton width={'1.5rem'} height={'1.5rem'} className="mr-2" circle={true} baseColor={'#33333399'} highlightColor={'#424349'}
                                                  borderRadius={0}/>
                                    }
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
                            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                    className="inline-flex items-center p-2 text-md font-medium text-center text-gray-300 hover:text-gray-400 y-400 rounded" type="button">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                                <ul className="py-1 text-sm text-gray-700 y-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Edit</a></li>
                                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Remove</a></li>
                                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Report</a></li>
                                </ul>
                            </div>
                        </footer>
                        <div className='flex items-center'>
                            {reply?.votes &&
                                <div className='flex flex-col items-center'>
                                    <button
                                    className={`cursor-pointe hover:text-gray-500 ${reply.voted === "up" ? "text-green-700 hover:text-green-700" : ""} text-2xl text-gray-300`}>
                                        <IoIosArrowUp/>
                                    </button>
                                    <div
                                        className={`min-w-[2.7rem] font-bold flex justify-center my-2 ${reply.votes > 0 ? 'text-green-600' : reply.votes === 0 ? 'text-gray-300' : 'text-red-700'}`}>{reply.votes}</div>
                                    <button
                                    className={`cursor-pointer hover:text-gray-500 ${reply.voted === "down" ? "text-red-700 hover:text-red-700" : ""} text-2xl text-gray-300`}>
                                        <IoIosArrowDown/>
                                    </button>
                                </div>
                            }
                            {!(reply?.votes) &&
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
        </div>
    )
}

export default Comment
