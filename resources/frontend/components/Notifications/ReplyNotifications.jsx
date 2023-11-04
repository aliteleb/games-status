import React from 'react'

function ReplyNotification(props) {

  const [replyStatus, setReplyStatus] = React.useState(props?.info.is_read)

  let seenComment = () => {
    setReplyStatus(true)
  }

  return (
    <div
    onClick={seenComment}
    className={`flex py-4 items-center bg-neutral-800 px-2 relative cursor-pointer bg-gradient-to-r ${!replyStatus ? "border-r-2 border-green-700" : "rounded"} hover:to-red-900/50 hover:from-black transition rounded-tl rounded-bl`}>
      <img className='w-12 h-12 rounded-full' src={props?.info.comment.user.avatar} alt="" />
      <div className='mx-4 py-4'>
        <p className='text-gray-300'>Your comment received a reply from <b>{props?.info.comment.username}</b></p>
      </div>
      { replyStatus || <div className='text-green-700 absolute right-2 top-[-20px] text-4xl'>.</div>}
      <div className='absolute right-3 bottom-1 text-gray-400'>{props?.info.time}</div>
    </div>
  )
}

export default ReplyNotification
