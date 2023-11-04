import React, { useEffect } from "react";
import ApiClient from "../../services/ApiClient";

function ReplyNotification(props) {

    const [replyStatus, setReplyStatus] = React.useState(false);

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

    console.log(props.info);

    return (
        <div
            onClick={seenComment}
            className={`animate-slide-down-slow flex items-center  relative cursor-pointer ${replyStatus ? 'bg-neutral-800/60' : 'bg-neutral-700 hover:bg-neutral-800'} bg-gradient-to-r ${!replyStatus ? "border-r-4 border-r-red-700" : ""} border border-transparent hover:bg-neutral-800/50 hover:border-red-700 transition `}>

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
        </div>
    );
}

export default ReplyNotification;
