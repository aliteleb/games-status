import React from 'react'

function Profile() {
  return (
    <>
      <div className='flex justify-between w-full bg-black/50 h-[22rem]'>
        <div className='flex flex-col justify-center items-center w-full'>
          <img className={`col-span-2 sm:col-auto w-[7rem] h-[7rem] object-cover`}
              src={'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'} alt=""/>
          <h1 className='mt-3 text-xl'>Username</h1>
        </div>
        <div className='text-center border-t md:border-0 border-gray-300 w-[80%] pt-3 md:col-span-1 col-span-2 m-auto'>
            <div className='text-xl'>FOLLOWERS</div>
            <div className='my-2 text-2xl'>
                {/* {game.name ? game.followers_count : <Skeleton width={'30%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>} */}
                gggggggg
            </div>
        </div>
      </div>  
      <div className="flex justify-between items-center my-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-300">
              Games (30)
          </h2>
      </div>
    </>

  )
}

export default Profile