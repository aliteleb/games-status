import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, {useEffect, useState} from 'react';
import IconBxsTimeFive from "../icons/IconBxsTimeFive.jsx";
import CheckMarkIcon from "../icons/CheckMarkIcon.jsx";
import {IoMdRemoveCircle} from "react-icons/io";
import ApiClient from "../../services/ApiClient.js";

const GameCard = (props) => {

    let protection = {
        name: null,
        slug: null,
        games_count: null,
        last_game: null,
    };
    if (props.info !== undefined) {
        protection = props.info;
    }

    let customStyles = props.animate === true ? 'fade ' : '';

    return (
        <div className={'bg-[#161515] rounded maxHeight shadow-md card' + protection.className || ''}>
            <div className='flex flex-col'>
                <h1 className='text-center bg-slate-600 py-3 rounded-t'>{protection.name}</h1>
                <h2 className='my-5 px-5'>Games (<b>{protection.games_count}</b>)</h2>
                <h3 className='my-5 px-5'>Last Game: {protection.last_game?.name || "N/A"}</h3>
            </div>
        </div>
    );
}

export default GameCard;
