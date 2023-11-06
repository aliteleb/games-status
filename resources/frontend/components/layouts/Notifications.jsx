import React from "react";
import GameNotification from "../Notifications/GameNotification";
import ReplyNotification from "../Notifications/ReplyNotifications";
import ApiClient from "../../services/ApiClient";
import {useAuth} from '../api/AuthContext'

function Notifications(props) {
    const {user} = useAuth()

    const [response, setResponse] = React.useState(null);
    const [notifications, setNotifications] = React.useState(null);

    React.useEffect(() => {
        if(user){
            setNotifications(window.appData.notifications.notifications);
            props.setNotificationsCount(window.appData.notifications.notifications_count);
            props.setUnReadNotificationsCount(window.appData.notifications.unread_notifications);
    
            const interval = setInterval(() => {
                ApiClient().get("/notifications")
                    .then(res => {
                        setResponse(res.data.data);
                        setNotifications(res.data.data.notifications);
                        props.setNotificationsCount(res.data.data.notifications_count);
                        props.setUnReadNotificationsCount(res.data.data.unread_notifications);
                    })
                    .catch(err => console.log(err));
    
            }, 5000);
        }

    }, []);

    return (
        <div className="flex flex-col gap-y-2 bg-black/50 p-2">
            {
                notifications?.map((item, index) => item.type === "reply" ?
                    <ReplyNotification setShowNotificationPopup={props.setShowNotificationPopup} setNotifications={setNotifications} setUnReadNotificationsCount={props.setUnReadNotificationsCount} key={index} info={item} /> :
                    <GameNotification setShowNotificationPopup={props.setShowNotificationPopup} setNotifications={setNotifications} setUnReadNotificationsCount={props.setUnReadNotificationsCount} key={index} info={item} />)
            }
        </div>
    );
}

export default Notifications;
