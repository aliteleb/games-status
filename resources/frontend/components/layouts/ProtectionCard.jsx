import React, {useEffect, useState} from 'react';


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
                <h1 className='text-center bg-slate-600 py-3 rounded-t'><span className={`${is_animated}`}>{protection.name}</span></h1>
                <h2 className='py-5 px-5 bg-slate-600/10'>Games <span className={`${is_animated}`}>(<b>{protection.games_count}</b>)</span></h2>
                <h3 className='py-5 px-5 bg-slate-700/10'>Last Game: <span className={`${is_animated}`}>{protection.last_game?.name || "N/A"}</span></h3>
            </div>
        </div>
    );
}

export default ProtectionsCard;
