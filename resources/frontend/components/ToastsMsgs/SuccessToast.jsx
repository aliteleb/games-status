import React from 'react'
import SuccessfullFace from '../icons/SuccessfullFace'
import Xmark from '../icons/Xmark'

function ToastMsg() {
  return (
    <div id='success' className=' absolute bottom-12 -right-[30rem] border-t-[3px] w-96 py-2 px-3 h-16 rounded flex justify-between text-gray-900 bg-[#efefef] border-green-500'>
        <div className='flex items-center'>
          <SuccessfullFace/>
          <div className='mx-3'>
            <h1 className='font-bold text-gray-600'>Successfull</h1>
            <p>any text you want .............</p>
          </div>
        </div>
        <Xmark />
    </div>
  )
}

export default ToastMsg