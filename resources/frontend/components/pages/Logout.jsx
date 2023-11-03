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

    return (
        <div className='m-auto overflow-hidden rounded-md p-6 text-gray-300 bg-app-black/50 md:w-[50%]'>
            <div className='my-10 flex flex-col items-center justify-center'>
                {!response && <AiOutlineLoading className='h-20 w-20 animate-spin rounded-full p-3'/>}
                {response && <MdDoneOutline className='h-20 w-20 rounded-full bg-emerald-700 p-3'/>}
                <h2 className='mt-12 text-2xl text-gray-400'>{response ? "Signed out" : "Signing out..."}</h2>
                <div className={`text-gray-400 text-md mx-4 mt-6 ${!response ? "hidden" : ""}`}>Redirecting to home page...</div>
            </div>
        </div>
    )
}

export default Logout
