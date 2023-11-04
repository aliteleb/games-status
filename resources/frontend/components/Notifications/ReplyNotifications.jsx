import React from 'react'

function ReplyNotification(props) {

  const [replyStatus, setReplyStatus] = React.useState(props.info.is_read)

  let seenComment = () => {
    setReplyStatus(true)
  }

  return (
    <div
    onClick={seenComment} 
    className='flex py-3 items-center bg-black/20 px-2 relative cursor-pointer hover:bg-black/50 transition'>
      <img className='w-12 h-12 rounded-full' src={props.info.comment.user.avatar} alt="" />
      <div className='mx-4 py-4'>
        <p className='text-gray-300'>Your comment received a reply from <b>{props.info.comment.username}</b></p>
      </div>
      { replyStatus || <div className='text-green-700/70 absolute right-2 top-[-20px] text-4xl'>.</div>}
    </div>
  )
}

export default ReplyNotification