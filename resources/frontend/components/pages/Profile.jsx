import React from 'react'

function Profile() {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr_1fr] w-full bg-black/50 justify-items-center'>
        <div className='flex flex-col justify-center items-center w-full'>
          <img className={`col-span-2 sm:col-auto w-[7rem] h-[7rem] object-cover`}
              src={'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'} alt=""/>
          <h1 className='mt-3 text-xl'>Username</h1>
        </div>
        <div className="h-[22rem] w-full px-4 py-2 text-center sm:text-left">
            <div className="grid grid-rows-[1fr_1fr] w-max mx-auto sm:mx-0 mt-2 sm:mt-0">
                <div className='flex justify-between'>
                    <div className='text-white/40 font-extralight'>Status</div>
                    <div className={`text-lg text-`}>
                        {/* {game.status_long || <Skeleton height={'20px'} baseColor={'#27282e'} highlightColor={'#424349'} borderRadius={0}/>} */}
                    </div>
                </div>
                <div className={`w-full text-[3rem] rounded font-bold -mt-[2rem]`}>
                    {/* {game.status_text || <Skeleton width={'20rem'} height={'30px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={'30px'}/>} */}
                    text
                </div>
            </div>
            <div className='w-full my-5'>
                <div className='text-[#dddddd99] font-extralight'>GAME</div>
                <div className='text-xl'>
                    {/* {game.name || <Skeleton width={'90%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>} */}
                    game
                </div>
            </div>
            <div className='grid grid-cols-2 gap-y-4 justify-between'>
                <div>
                    <div className='text-[#dddddd99] font-extralight'>RELEASE DATE</div>
                    <div className='text-xl'>
                        {/* {game.release_date || <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>} */}
                        aaaaa
                    </div>
                </div>
                <div>
                    <div className='text-[#dddddd99] font-extralight'>DRM PROTECTIONS</div>
                    <div className='text-xl'>
                        {/* {game.protections?.map((drm, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                    to={`/protection/${drm.slug}`}>{drm.name}</Link>)}
                        {game.protections?.length === 0 &&
                            <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>} */}
                            aaaaaa
                    </div>
                </div>
                <div>
                    <div className='text-[#dddddd99] font-extralight'>CRACK DATE</div>
                    <div className='text-xl'>
                        {/* {game.crack_date || <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>} */}
                        ddddddd
                    </div>
                </div>
                <div>
                    <div className='text-[#dddddd99] font-extralight'>SCENE GROUPS</div>
                    <div className='text-xl'>
                        {/* {game.groups?.map((group, index) => <Link key={index} className="inline-block mx-1 transition hover:opacity-70"
                                                                to={`/group/${group.slug}`}>{group.name}</Link>)}
                        {game.groups?.length === 0 && <Skeleton width={'80%'} height={'20px'} baseColor={'#27282e99'} highlightColor={'#424349'} borderRadius={20}/>} */}
                        dddddddd
                    </div>
                </div>
            </div>
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