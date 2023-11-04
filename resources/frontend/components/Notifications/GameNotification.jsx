import React from 'react'

function GameNotification(props) {

  const [replyStatus, setReplyStatus] = React.useState(props?.info.is_read)

  let seenComment = () => {
    setReplyStatus(true)
  }

  console.log(props?.info);

  let color = props?.info.game_info.status_text ? props?.info.game_info.status_text.toLowerCase() : "gray-600";

  return (
    <div
    onClick={seenComment}
    className={`flex py-4 items-center bg-neutral-800 px-2 relative cursor-pointer bg-gradient-to-r ${!replyStatus ? "border-r-2 border-green-700" : "rounded"} hover:to-red-900/50 hover:from-black transition rounded-tl rounded-bl`}>
      <img className='w-16 h-16' src={props?.info.game_info.poster} alt="game poster"/>
      <div className='mx-4'>
        <div className='font-bold text-lg'>{props?.info.game_info.title}</div>
        <p className={`text-${color} font-bold text-xl`}>{props?.info.game_info.status_text}</p>
      </div>
      {replyStatus || <div className='text-green-700 absolute right-2 top-[-20px] text-4xl'>.</div>}
      <div className='absolute right-3 bottom-3 text-gray-400'>{props?.info.time}</div>
    </div>
  )
}

export default GameNotification
