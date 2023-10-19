import React, {useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';


const ProtectionsCard = (props) => {

    let protection = null;
    if (props.info !== undefined)
        protection = props.info;

    let is_animated = props.animate === true ? 'fade ' : '';

    return (
        <div className={`bg-[#161515] rounded maxHeight shadow-lg border transform border-gray-700 hover:translate-x-1 hover:border-gray-600 transition ${props.className || ''}`}>
            <div className={`flex flex-col`} >
                {protection &&
                <>
                    <h1 className='text-center bg-slate-600 py-3 rounded-t'>
                        <span className={`${is_animated}`}>{protection.name}</span>
                    </h1>
                    <h2 className='p-5 bg-slate-600/10'>Games
                        <span className={`${is_animated}`}>
                            (<b>
                                {protection.games_count}
                            </b>)
                        </span>
                    </h2>

                    <h3 className='p-5 bg-slate-700/10 grid grid-cols-[auto_1fr]'>
                        <span>Last Game:</span>
                        <span className={`${is_animated} col-auto text-center`}>{protection.last_game?.name}</span>
                    </h3>
                </>
                }
                {!protection &&
                    <>
                        <div className='p-3 text-center bg-slate-600 '>
                            <Skeleton className={'opacity-50'} width={'60%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
                        </div>
                        <div className='p-5 bg-slate-600/10'>
                            <Skeleton width={'40%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={10}/>
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

export default ProtectionsCard;
