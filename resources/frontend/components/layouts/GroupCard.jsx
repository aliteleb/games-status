import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {GiPirateFlag} from 'react-icons/gi'
import { Link } from 'react-router-dom';

const GroupCard = (props) => {

    let group = null;
    if (props.info !== undefined)
        group = props.info;

    let is_animated = props.animate === true ? 'animate-fade-in ' : '';

    return (
        <div className={`relative group bg-[#16191e] rounded maxHeight ${group?'shadow hover:shadow-lg hover:bg-black/60':''} overflow-hidden transition ${props.className || ''}`}>
            <div className={`flex flex-col`} >
                {group &&
                <Link to={`/group/${group?.slug}`}>
                    <GiPirateFlag className='absolute top-16 h-20 w-52 text-red-800 opacity-20 right-[-3rem]'/>
                    <div className='bg-red-900 py-3 text-center opacity-90 group-hover:bg-red-700'>
                        <span className={`${is_animated}`}>{group.name}</span>
                    </div>

                    <div className='grid p-5 grid-cols-[auto_1fr]'>
                        <span className="text-sm text-gray-300">Games</span>
                        <span className={`${is_animated} col-auto text-center font-bold`}>{group.games_count}</span>
                    </div>

                    <div className='grid p-5 grid-cols-[auto_1fr]'>
                        <span className="text-sm text-gray-300">Last Game</span>
                        <span className={`${is_animated} col-auto text-center font-bold px-2`}>{group.last_game?.name}</span>
                    </div>
                </Link>
                }
                {!group &&
                    <>
                        <div className='bg-red-900 p-3 text-center'>
                            <Skeleton className={'opacity-50'} width={'60%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                        </div>
                        <div className='flex gap-x-6 bg-slate-700/10 p-5'>
                            <div className="inline w-6/12">
                                <Skeleton width={'100%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                            </div>
                            <div className="inline w-6/12">
                                <Skeleton width={'100%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                            </div>
                        </div>
                        <div className='flex gap-x-6 bg-slate-700/10 p-5'>
                            <div className="inline w-3/12">
                                <Skeleton width={'100%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                            </div>
                            <div className="inline w-9/12">
                                <Skeleton width={'100%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                            </div>
                        </div>

                    </>
                }

            </div>
        </div>
    );
}

export default GroupCard;
