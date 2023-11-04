import React, { useEffect } from "react";
import ApiClient from "../../services/ApiClient";

function GameNotification(props) {

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
                    setReplyStatus(false),
                        console.log(err);
                }
            );

    };

    let color = props?.info.game_info.status_text ? props?.info.game_info.status_text.toLowerCase() : "gray-600";

    return (
        <div
            onClick={seenComment}
            className={`animate-slide-down-slow flex items-center bg-neutral-800 relative cursor-pointer bg-gradient-to-r ${!replyStatus ? "border-r-4 border-r-red-700" : ""} border border-transparent hover:bg-neutral-800/50 hover:border-red-700 transition `}>

            {replyStatus || <div className="bg-red-700 absolute right-2 top-2 w-[5px] h-[5px] rounded-full text-4xl"></div>}

            <div className="flex flex-col w-10/12">
                <div className="flex items-center">
                    <img className="h-20 " src={props?.info.game_info.poster} alt="" />

                    <div className="mx-3 py-4">
                        <p className="text-gray-300 font-bold">{props?.info.game_info.title}</p>
                        <p className={`text-${color} font-bold text-xl`}>{props?.info.game_info.status_text}</p>
                    </div>
                </div>
            </div>
            <div className="bottom-1 text-gray-400 text-xs text-right px-2 py-1">{props?.info.time}</div>
        </div>
    );
}

export default GameNotification;
