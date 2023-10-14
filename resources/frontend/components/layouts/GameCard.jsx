import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from 'react';
import IconBxsTimeFive from "../icons/IconBxsTimeFive.jsx";
import CheckMarkIcon from "../icons/CheckMarkIcon.jsx";
import {IoMdRemoveCircle} from "react-icons/io";

const GameCard = (props) => {

    // props = false; // Uncomment this to see the component as a placeholder

    let color = props.statusText ? props.statusText.toLowerCase() : 'gray-600';
    let icon, days;
    switch (props.statusText || '') {
        case "CRACKED":
            icon = <CheckMarkIcon className={'inline-block mr-0.5 w-4 h-4 text-' + color}/>;
            days = "D+" + props.days;
            break;
        case "UNCRACKED":
            icon = <IoMdRemoveCircle className={'inline-block mr-0.5 w-4 h-4 text-' + color}/>;
            days = "D+" + props.days;
            break;
        default:
            icon = <IconBxsTimeFive className={'inline-block mr-0.5 w-4 h-4 text-' + color}/>;
            days = "D-" + props.days;
    }

    return (
        <div className={'h-full flex flex-col shadow-md shadow-black bg-black ' + props.className || ''}>

                <img className={'pointer-events-none border-b-4 border-'+color} src={props.image || '/assets/images/game-placeholder.jpg'} alt={'game'}/>
                <div className={'grid grid-cols-[1fr_30px] md:grid-cols-[1fr_40px]'}>
                    <div className={'px-2 py-1'}>
                        <h1 className={'text-gray-200'}>
                            {props.title || <Skeleton width={'100%'} height={'14px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                        </h1>
                        <div className="flex flex-wrap">
                            <h2 className={'w-full text-sm text-' + color}>
                                {props.statusText && icon}
                                {props.statusText || <Skeleton width={'80%'} height={'12px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                                {props.statusText && <span className="text-sm font-light"> {days}</span>}
                            </h2>
                        </div>

                    </div>
                    <div className={'text-white m-auto relative'}>
                        <input type='checkbox' className="before:hover:rounded-sm"/>
                    </div>
                </div>
                {props.size === "large" && <div className="flex flex-wrap justify-around h-full">
                    <div className="w-1/3">
                        <Skeleton  width={'100%'} height={'100%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>
                    </div>
                    <div className="w-1/3">
                        <Skeleton  width={'100%'} height={'100%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>
                    </div>
                    <div className="w-1/3">
                        <Skeleton  width={'100%'} height={'100%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>
                    </div>
                </div>}


        </div>
    );
}

export default GameCard;
