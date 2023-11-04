import React from "react";
import GameNotification from "../Notifications/GameNotification";
import ReplyNotification from "../Notifications/ReplyNotifications";
import ApiClient from "../../services/ApiClient";

function Notifications(props) {

    let [response, setResponse] = React.useState(null);
    let [notifications, setNotifications] = React.useState(null);

    React.useEffect(() => {

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
    }, []);

    return (
        <>
            {
                notifications?.map((item, index) => item.type === "reply" ?
                    <ReplyNotification setNotifications={setNotifications} setUnReadNotificationsCount={props.setUnReadNotificationsCount} key={index} info={item} /> :
                    <GameNotification setNotifications={setNotifications} setUnReadNotificationsCount={props.setUnReadNotificationsCount} key={index} info={item} />)
            }
        </>
    );
}

export default Notifications;
