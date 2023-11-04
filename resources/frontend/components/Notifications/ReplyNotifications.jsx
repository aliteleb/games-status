import React, { useEffect } from "react";
import ApiClient from "../../services/ApiClient";
import { BsArrowRight } from 'react-icons/bs';

function ReplyNotification(props) {

    const [replyStatus, setReplyStatus] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
  

    useEffect(() => {
        setReplyStatus(props?.info.is_read)
    });
    let seenComment = () => {

        setReplyStatus(true);

        ApiClient().post(`/notification/${props.info.id}/read`)
            .then(res => {
                props.setNotifications(res.data.data.notifications);
                props.setUnReadNotificationsCount(res.data.data.unread_notifications);

            })
            .catch(err => {
                    setReplyStatus(false);
                    console.log(err);
                }
            );
    };


    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={seenComment}
            className={`animate-slide-down-slow flex items-center justify-between relative cursor-pointer ${replyStatus ? 'bg-neutral-800/60' : 'bg-neutral-800 hover:bg-neutral-900'} bg-gradient-to-r ${!replyStatus ? "border-r-4 border-r-red-700" : ""} border border-transparent hover:bg-neutral-800/50 hover:border-red-700 transition `}>

            {replyStatus || <div className="absolute right-2 top-2 h-[5px] w-[5px] rounded-full bg-red-700 text-4xl"></div>}

            <div className='flex-co flex w-9/12'>
                <div className="flex items-center px-1">
                    <img className="h-12 w-12 rounded-full" src={props?.info.comment.user.avatar} alt="" />

                    <div className="mx-2 py-4">
                        <p className="text-gray-300">Your comment received a reply from <b>{props?.info.comment.username}</b></p>
                    </div>
                </div>
            </div>
            <div className="bottom-1 px-2 py-1 text-right text-xs text-gray-400">{props?.info.time}</div>
            {isHovered && <BsArrowRight className="animate-slide-left-slow mx-2 h-9 w-9 p-1 text-gray-500 transition hover:text-gray-300"/>}
        </div>
    );
}

export default ReplyNotification;
