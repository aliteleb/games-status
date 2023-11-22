import React from "react";
import GameNotification from "../Notifications/GameNotification";
import ReplyNotification from "../Notifications/ReplyNotifications";
import VoteNotification from "../Notifications/VoteNotification";
import ApiClient from "../../services/ApiClient";
import { useAuth } from "../api/AuthContext";

function Notifications(props) {

    const { user } = useAuth();

    const [notifications, setNotifications] = React.useState(null);

    const updateNotifications = () => {
        ApiClient().get("/notifications")
            .then(res => {
                setNotifications(res.data.data.notifications);
                props.setNotificationsCount(res.data.data.notifications_count);
                props.setUnReadNotificationsCount(res.data.data.unread_notifications);
            })
            .catch(err => {});

    };


    React.useEffect(() => {

        const interval = setInterval(() => {
            if(user)
                updateNotifications()
        }, 5000);

        if (user) {
            setNotifications(window.appData.notifications.notifications);
            props.setNotificationsCount(window.appData.notifications.notifications_count);
            props.setUnReadNotificationsCount(window.appData.notifications.unread_notifications);
        }

        return () => {
            // Cleanup the interval when the component unmounts or when the user becomes null
            clearInterval(interval);
        };

    }, [user]);

    return (
        <div className="flex flex-col gap-y-2 bg-black/50 p-2">
            {
                notifications?.map((item, index) => item.type === "reply" ?
                    <ReplyNotification setShowNotificationPopup={props.setShowNotificationPopup} setNotifications={setNotifications}
                                       setUnReadNotificationsCount={props.setUnReadNotificationsCount} key={index} info={item} /> :
                                       item.type === "game_status" ?

                    <GameNotification setShowNotificationPopup={props.setShowNotificationPopup} setNotifications={setNotifications}
                                      setUnReadNotificationsCount={props.setUnReadNotificationsCount} key={index} info={item} /> :

                    <VoteNotification setShowNotificationPopup={props.setShowNotificationPopup} setNotifications={setNotifications}
                                      setUnReadNotificationsCount={props.setUnReadNotificationsCount} key={index} info={item} />)
            }
        </div>
    );
}

export default Notifications;
