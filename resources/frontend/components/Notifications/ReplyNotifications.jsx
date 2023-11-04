import React from "react";

function ReplyNotification(props) {

    const [replyStatus, setReplyStatus] = React.useState(props?.info.is_read);

    let seenComment = () => {
        setReplyStatus(true);
    };

    return (
        <div
            onClick={seenComment}
            className={`flex items-center bg-neutral-800 relative cursor-pointer bg-gradient-to-r ${!replyStatus ? "border-r-4 border-r-green-700" : ""} border border-transparent hover:bg-neutral-800/50 hover:border-red-700 transition `}>

            {replyStatus || <div className="bg-green-700 absolute right-2 top-2 w-[5px] h-[5px] rounded-full text-4xl"></div>}

            <div className="flex flex-col w-10/12">
                <div className="flex items-center">
                    <img className="w-12 h-12 rounded-full" src={props?.info.comment.user.avatar} alt="" />

                    <div className="mx-1 py-4">
                        <p className="text-gray-300">Your comment received a reply from <b>{props?.info.comment.username}</b></p>
                    </div>
                </div>
            </div>
            <div className="bottom-1 text-gray-400 text-xs text-right px-2 py-1">{props?.info.time}</div>
        </div>
    );
}

export default ReplyNotification;
