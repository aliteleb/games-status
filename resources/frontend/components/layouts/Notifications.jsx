import React from 'react'
import GameNotification from '../Notifications/GameNotification'
import ReplyNotification from '../Notifications/ReplyNotifications'

function Notifications() {
  return (
    <>
      <GameNotification />
      <GameNotification />
      <GameNotification />
      <GameNotification />
      <ReplyNotification />
      <ReplyNotification />
      <ReplyNotification />
    </>
  )
}

export default Notifications