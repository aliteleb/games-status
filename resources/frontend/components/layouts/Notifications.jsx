import React from 'react'
import GameNotification from '../Notifications/GameNotification'
import ReplyNotification from '../Notifications/ReplyNotifications'
import ApiClient from '../../services/ApiClient'

function Notifications(props) {

  let [response, setResponse] = React.useState(null)
  let [notifications, setNotifications] = React.useState(null)

  React.useEffect( () => {

    setNotifications(window.appData.notifications)
    props.setNotificationsCount(window.appData.notifications.length)

    const interval = setInterval(() => {
      ApiClient().get('/notifications')
      .then(res => {
        setResponse(res.data.data)
        setNotifications(res.data.data)
        props.setNotificationsCount(res.data.data.length)
      })
      .catch(err => console.log(err))

    }, 5000)
  }, [] )


  let replyNotifications = notifications?.map((item, index) => item.type === 'reply' ? <ReplyNotification setNotifications={setNotifications} key={index} info={item}/> : <GameNotification setNotifications={setNotifications} key={index} info={item}/>)

  return (
    <>
      {replyNotifications}
    </>
  )
}

export default Notifications
