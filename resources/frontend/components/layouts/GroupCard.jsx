import React from 'react';
import Skeleton from 'react-loading-skeleton';

const GroupCard = (props) => {

    let group = null;
    if (props.info !== undefined)
        group = props.info;

    let is_animated = props.animate === true ? 'fade ' : '';

    return (
        <div className={`relative group bg-black/50 rounded maxHeight ${group?'shadow hover:shadow-lg hover:bg-black/60':''} overflow-hidden transition ${props.className || ''}`}>
            <div className={`flex flex-col`} >
                {group &&
                <>
                    <div className='text-center bg-red-900 opacity-90 py-3 group-hover:bg-red-700 transition'>
                        <span className={`${is_animated}`}>{group.name}</span>
                    </div>

                    <div className='p-5 bg-slate-700/10 grid grid-cols-[auto_1fr]'>
                        <span className="text-sm text-gray-300">Games</span>
                        <span className={`${is_animated} col-auto text-center font-bold`}>{group.games_count}</span>
                    </div>

                    <div className='p-5 bg-slate-700/10 grid grid-cols-[auto_1fr]'>
                        <span className="text-sm text-gray-300">Last Game</span>
                        <span className={`${is_animated} col-auto text-center font-bold`}>{group.last_game?.name}</span>
                    </div>
                </>
                }
                {!group &&
                    <>
                        <div className='p-3 text-center bg-red-900 '>
                            <Skeleton className={'opacity-50'} width={'60%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                        </div>
                        <div className='p-5 bg-slate-700/10 flex gap-x-6'>
                            <div className="inline w-6/12">
                                <Skeleton width={'100%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                            </div>
                            <div className="inline w-6/12">
                                <Skeleton width={'100%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                            </div>
                        </div>
                        <div className='p-5 bg-slate-700/10 flex gap-x-6'>
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
