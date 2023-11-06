import React, { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import { BsArrowRight } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";

function GameNotification(props) {
    
    const navigate = useNavigate()
    
    const [replyStatus, setReplyStatus] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setReplyStatus(props?.info.is_read);
    }, [props.info.is_read]);
    
    let seenComment = () => {

        setReplyStatus(true);

        ApiClient().post(`/notification/${props.info.id}/read`)
            .then(res => {
                props.setNotifications(res.data.data.notifications);
                props.setUnReadNotificationsCount(res.data.data.unread_notifications);
            })
            .catch(err => {
                    setReplyStatus(false),
                        console.log(err);
                }
            );
    };

    let navigateToTheGame = () => {
        navigate(`/game/${props.info.game_info.slug}`)
        props.setShowNotificationPopup(false)
    }

    console.log(props.info);

    let color = props?.info.game_info.status_text ? props?.info.game_info.status_text.toLowerCase() : "gray-600";

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={seenComment}
            className={`animate-slide-down-slow flex items-center justify-between bg-neutral-800 relative cursor-pointer ${replyStatus ? 'bg-neutral-800/60' : 'bg-neutral-800 hover:bg-neutral-900'} bg-gradient-to-r ${!replyStatus ? "border-r-4 border-r-red-700" : ""} border border-transparent hover:bg-neutral-800/50 hover:border-red-700 transition `}>

            {replyStatus || <div className="absolute right-2 top-2 h-[5px] w-[5px] rounded-full bg-red-700 text-4xl"></div>}

            <div className="flex w-9/12 flex-col">
                <div className="flex items-center">
                    <img className="h-28" src={props?.info.game_info.poster} alt="" />

                    <div className="mx-3 py-2 h-28 flex flex-col">
                        <p className="font-bold text-xl text-gray-300">{props?.info.game_info.title}</p>
                        <Link to={`/group/${props.info.game_info.groups[0].slug}`} className="mt-4 text-gray-400 hover:text-gray-300 transition">{props.info.game_info.groups[0].name}</Link>
                        <div className="flex items-center">
                            <p className={`text-${color} font-bold text-xl`}>{props?.info.game_info.status_text}</p>
                            <span className="mx-6 text-gray-400">After {props.info.game_info.days_diff} days</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-1 px-2 py-1 text-right text-xs text-gray-400">{props?.info.time}</div>
            {isHovered && <BsArrowRight onClick={navigateToTheGame} className="animate-slide-left-slow mx-2 h-9 w-9 p-1 text-gray-500 transition hover:text-gray-300"/>}
        </div>
    );
}

export default GameNotification;