import React from 'react'
import Skeleton from "react-loading-skeleton";
import {BiDotsHorizontalRounded} from 'react-icons/bi'

function CommentPlaceholder(props) {
    return (
        <div className={props.className}>
            <article className="p-4 text-base rounded-lg">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-200 font-semibold">
                            <Skeleton width={'5rem'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                        </p>
                        <p className="text-xs text-gray-400">
                            <Skeleton width={'6rem'} height={'12px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                        </p>
                    </div>
                </footer>
                <div className='flex items-center'>
                    <Skeleton width={'2rem'} height={'6rem'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={10}/>
                    <div>
                        <p className="mx-6 text-gray-400 w-[9rem] sm:w-[20rem] md:w-[30rem] max-w-[65rem]">
                            <Skeleton count={3} width={'100%'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                        </p>
                        <div className="mx-6 flex flex-col mt-4 space-x-4">
                            <Skeleton width={'4rem'} height={'16px'} baseColor={'#33333399'} highlightColor={'#424349'} borderRadius={50}/>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default CommentPlaceholder
