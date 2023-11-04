import React from 'react'
import GameNotification from '../Notifications/GameNotification'
import ReplyNotification from '../Notifications/ReplyNotifications'
import ApiClient from '../../services/ApiClient'

function Notifications(props) {

  let [response, setResponse] = React.useState(null)
  let [notifications, setNotifications] = React.useState(null)

  React.useEffect( () => {

    setNotifications(window.appData.notifications)

    const interval = setInterval(() => {
      ApiClient().get('/notifications')
      .then(res => {
        setResponse(res.data.data)
        setNotifications(res.data.data)
      })
      .catch(err => console.log(err))

    }, 5000)

    props.setNotificationsCount(notifications?.length)

  }, [] )


  let replyNotifications = notifications?.map((item, index) => item.type === 'reply' ? <ReplyNotification key={index} info={item}/> : <GameNotification key={index} info={item}/>)

  return (
    <>
      {replyNotifications}
    </>
  )
}

export default Notifications