import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from 'react';
import IconBxsTimeFive from "../icons/IconBxsTimeFive.jsx";
import CheckMarkIcon from "../icons/CheckMarkIcon.jsx";
import RemoveIcon from "../icons/RemoveIcon.jsx";

const GameCard = (props) => {

    // props = false; // Uncomment this to see the component as a placeholder

    let color = props.statusText ? props.statusText.toLowerCase() : 'gray-600';
    let icon = <IconBxsTimeFive className={'inline-block mr-0.5 w-4 h-4 text-' + color}/>;
    let days = "";
    switch (props.statusText || '') {
        case "CRACKED":
            icon = <CheckMarkIcon className={'inline-block mr-0.5 w-4 h-4 text-' + color}/>;
            days = "D+" + props.days;
            break;
        case "UNCRACKED":
            icon = <RemoveIcon className={'inline-block mr-0.5 w-4 h-4 text-' + color}/>;
            days = "D+" + props.days;
            break;
        default:
            icon = <IconBxsTimeFive className={'inline-block mr-0.5 w-4 h-4 text-' + color}/>;
            days = "D-" + props.days;

    }


    return (
        <div className={'h-full ' + props.className || ''}>

            <div className={'flex flex-col h-full shadow-md shadow-black bg-black'}>
                <img className={'pointer-events-none border-b-4 border-'+color} src={props.image || '/src/assets/game-placeholder.jpg'} alt={'game'}/>

                <div className={'grid grid-cols-[1fr_30px] md:grid-cols-[1fr_40px]'}>
                    <div className={'px-2 py-1'}>
                        <h1 className={'text-gray-200'}>
                            {props.title || <Skeleton width={'100%'} height={'14px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                        </h1>
                        <div className="flex flex-wrap">
                            <h2 className={'w-full text-' + color}>
                                {props.statusText && icon}
                                {props.statusText || <Skeleton width={'80%'} height={'12px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                                {props.statusText && <span className="text-sm font-light"> {days}</span>}
                            </h2>
                        </div>

                    </div>
                    <div className={'text-white m-auto'}>
                        <input type='checkbox'
                               className='appearance-none block border-2 border-gray-300 w-5 h-5 rounded-full cursor-pointer checked:after:block after:hidden after:mx-auto after:mt-1 after:rounded-full after:w-2 after:h-2 after:bg-cyan-400'/>
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

        </div>
    );
}

export default GameCard;
