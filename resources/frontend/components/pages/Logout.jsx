import React from 'react'
import ApiClient from '../../services/ApiClient'
import {AiOutlineLoading} from 'react-icons/ai'
import {MdDoneOutline} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../api/AuthContext'

function Logout() {

    const [response, setResponse] = React.useState(null)

    const navigate = useNavigate()

    const {updateUser}  = useAuth()

    React.useEffect(()=> {

        let logout = async () => {

            let response = await ApiClient().get('/logout')
            .then(res => 
                setResponse(res.data),
                updateUser(null),
                setTimeout(()=> {
                    navigate("/")
                }, 3000)
                )
            .catch(err => console.log(err))
        }

        logout()

    }, [])

    console.log(response);

    return (
        <div className='p-6 md:w-[50%] m-auto bg-app-black/50 rounded-md text-gray-300 overflow-hidden'>
            <div className='flex flex-col my-10 justify-center items-center'>
                {!response && <AiOutlineLoading className='animate-spin rounded-full w-20 h-20 p-3'/>}
                {response && <MdDoneOutline className='bg-emerald-700 rounded-full w-20 h-20 p-3'/>}
                <h2 className='text-gray-400 text-2xl mt-12'>{response ? "Signed out" : "Signing out..."}</h2>
                <div className={`text-gray-400 text-md mx-4 mt-6 ${!response ? "hidden" : ""}`}>Redirecting to home page...</div>
            </div>
        </div>
    )
}

export default Logout