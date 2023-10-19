import React, {useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';


const ProtectionsCard = (props) => {

    let protection = {
        name: null,
        slug: null,
        games_count: null,
        last_game: null,
    };
    if (props.info !== undefined) {
        protection = props.info;
    }

    let is_animated = props.animate === true ? 'fade ' : '';

    return (
        <div className={`bg-[#161515] rounded maxHeight shadow-lg border border-gray-700 ${protection.className || ''}`}>
            <div className={`flex flex-col`} >
                <h1 className='text-center bg-slate-600 py-3 rounded-t'>
                    <span className={`${is_animated}`}>
                    {protection.name || 
                        <Skeleton width={'40%'} height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>
                    }
                    </span>
                </h1>
                <h2 className='p-5 bg-slate-600/10'>Games <span className={`${is_animated}`}>(<b>{protection.games_count}</b>)</span></h2>
                <h3 className='p-5 bg-slate-700/10 grid grid-cols-[auto_1fr]'>
                    <span>Last Game:</span>
                    <span className={`${is_animated} col-auto text-center`}>{protection.last_game?.name || "N/A"}</span>
                </h3>
            </div>
        </div>
    );
}

export default ProtectionsCard;
