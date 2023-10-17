import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from "../api/AuthContext.jsx";
import ApiClient from "../../services/ApiClient.js";
import {toast, Toaster} from 'react-hot-toast';

export default function Login({loading, setLoading}) {

    const {updateUser} = useAuth();
    const navigate = useNavigate();

    let [formData, setFormData] = React.useState({
        username: "",
        password: "",
    })

    let handleChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }))
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        ApiClient().post('/login', {

            username: formData.username,
            password: formData.password

        }).then((response) => {
            updateUser(response.data.data);
            toast.success(response.data.message);
            navigate('/')
            setLoading(false)
        }).catch((err) => {
            toast.error(err.response.data.message)
            setLoading(false)
        });


    }

    return (
        <>
            <div className='mt-28 w-full overflow-hidden max-w-screen-xl mx-auto p-6 bg-custom-black bg-opacity-60 rounded-md text-gray-300'>
                <header className='border-b-2 pb-[10px] font-bold text-xl'>Login</header>
                <div className='mt-6 flex flex-col'>
                    <label htmlFor="username">Username</label>
                    <input name='username' value={formData.username} onChange={handleChange} type="text" className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
                </div>
                <div className='mt-6 flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input name='password' value={formData.password} onChange={handleChange} type="password" className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
                </div>
                <button onClick={handleSubmit}
                        className={`cursor-pointer w-max mt-6 text-white bg-btn hover:bg-btn-hover transition duration-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${loading ? 'disabled-button hover:bg-[#282c39]': ''}`}
                        disabled={loading}  
                        >
                        {loading ? 'Loggining in...' : 'Login'}
                </button>
                <div className='mt-4 text-sm'>Don't have an account?
                    <Link to="/sign-up" className='mx-2 text-white hover:text-gray-300 transition duration-200'>Sign Up</Link>
                </div>
            </div>
            <Toaster containerStyle={{top: 110}} toastOptions={{
                // Define default options
                className: '',
                duration: 2000,
                style: {
                    background: '#101010',
                    color: '#ddd',
                    border: '1px solid #222',
                },
                error: {
                    iconTheme: {
                        primary: '#E02424',
                        secondary: 'black',
                    },
                },

                // Default options for specific types

            }
            }/>

            <div className="h-12"></div>
        </>
    )
}
