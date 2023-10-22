import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, {useEffect, useState} from 'react';
import IconBxsTimeFive from "../icons/IconBxsTimeFive.jsx";
import CheckMarkIcon from "../icons/CheckMarkIcon.jsx";
import {IoMdRemoveCircle} from "react-icons/io";
import ApiClient from "../../services/ApiClient.js";
import toast from 'react-hot-toast';
import {Link} from "react-router-dom";

const GameCard = (props) => {

    let game = {
        status_text: null,
        days_diff: null,
        image: null,
        is_following: null,
    };
    if (props.info !== undefined) {
        game = props.info;
    }

    const [follow, setFollow] = useState(game.is_following || false);

    useEffect(() => {
        setFollow(game.is_following || false);
    }, [game.is_following]);

    let color = game.status_text ? game.status_text.toLowerCase() : 'gray-600';
    let icon, days;
    const statusText = game.status_text || '';

    switch (statusText) {
        case "CRACKED":
            icon = <CheckMarkIcon className={`inline-block mr-0.5 w-4 h-4 text-${color}`}/>;
            break;
        case "UNCRACKED":
            icon = <IoMdRemoveCircle className={`inline-block mr-0.5 w-4 h-4 text-${color}`}/>;
            break;
        default:
            icon = <IconBxsTimeFive className={`inline-block mr-0.5 w-4 h-4 text-${color}`}/>;
    }

    days = `D${statusText === "CRACKED" || statusText === "UNCRACKED" ? "+" : "-"}${game.days_diff}`;

    let customStyles = props.animate === true ? 'fade ' : '';

    const handleFollowChange = async () => {
        const newFollowState = !follow;
        setFollow(newFollowState);

        const action = newFollowState ? 'follow' : 'unfollow';

        ApiClient()
          .post(`/games/${game.id}/${action}`)
          .then((response) => {
            if (response.data.status === "success") {
                action === "follow" ? toast.success(response.data.message) : toast(response.data.message)
            } else {
              setFollow((prevFollow) => !prevFollow);
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            setFollow((prevFollow) => !prevFollow);
          });
      };

    const card = (<>
        <img className={customStyles + 'pointer-events-none border-b-4 border-' + color} style={{aspectRatio: '16/9'}} src={game.image || '/assets/images/game-placeholder.jpg'}
             alt={'game'}/>
        <div className={'grid grid-cols-[1fr_30px] md:grid-cols-[1fr_40px]'}>
            <div className={'px-2 py-1'}>
                <h1 className={'text-gray-200'}>
                    {game.title || <Skeleton width={'100%'} height={'14px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                </h1>
                <div className="flex flex-wrap">
                    <h2 className={'w-full text-sm text-' + color}>
                        {game.status_text && icon}
                        {game.status_text || <Skeleton width={'80%'} height={'12px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>}
                        {game.status_text && <span className="text-sm font-light"> {days}</span>}
                    </h2>
                </div>

            </div>
            <div className={'text-white m-auto relative'}>
                {props.info &&
                    <input
                        type='checkbox'
                        checked={follow}
                        onChange={handleFollowChange}
                        className="before:ring-2 before:ring-gray-700 before:hover:ring-2 before:hover:bg-gray-700/70 before:checked:bg-gray-700 before:hover:checked:bg-gray-700"/>
                }
            </div>
        </div>
    </>);
    return (
        <div className={'h-full flex flex-col shadow-md shadow-black bg-black ' + props.className || ''}>
            {game.slug ? <Link className="w-full h-full flex flex-col" to={`/game/${game.slug}`}>{card}</Link> : card}

            {props.size === "large" && <div className="flex flex-wrap justify-around h-full">
                <div className="w-1/3">
                    <Skeleton width={'100%'} height={'100%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>
                </div>
                <div className="w-1/3">
                    <Skeleton width={'100%'} height={'100%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>
                </div>
                <div className="w-1/3">
                    <Skeleton width={'100%'} height={'100%'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>
                </div>
            </div>}
        </div>
    );
}

export default GameCard;
