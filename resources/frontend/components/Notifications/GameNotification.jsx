import React from 'react'

function GameNotification(props) {

  const [replyStatus, setReplyStatus] = React.useState(props.info.is_read)

  let seenComment = () => {
    setReplyStatus(true)
  }

  let color = props.info.game_info.status_text ? props.info.game_info.status_text.toLowerCase() : "gray-600";

  return (
    <div 
    onClick={seenComment}
    className='flex items-center bg-black/20 relative cursor-pointer p-2'>
      <img className='w-12' src={props.info.game_info.poster} alt="game poster"/>
      <div className='mx-4'>
        <div className='font-bold text-lg'>{props.info.game_info.title}</div>
        <p className={`text-${color} font-bold text-xl`}>{props.info.game_info.status_text}</p>
      </div>
      {replyStatus || <div className='text-green-700/70 absolute right-2 top-[-20px] text-4xl'>.</div>}
    </div>
  )
}

export default GameNotification