import axios from '../api/ApiClient'
import React from 'react'
import {Link} from 'react-router-dom'

export default function Login() {

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

    let handleSubmit = async (e)=> {
        e.preventDefault()

        try{
            let response = await axios.post('/login', {
                username: formData.username,
                password: formData.password
            })

            if(response.status){
                console.log("Login Sucessfully");
            }

        }catch (err){
            console.log('User not found');
        }
    }

    return (
        <>
            <div className='mt-28 w-full max-w-screen-xl mx-auto p-6 bg-custom-black bg-opacity-60 rounded-md text-gray-300'>
                <header className='border-b-2 pb-[10px] font-bold text-xl'>Login</header>
                <div className='mt-6 flex flex-col'>
                    <label htmlFor="username">Username</label>
                    <input name='username' value={formData.username} onChange={handleChange} type="text" className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
                </div>
                <div className='mt-6 flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input name='password' value={formData.password} onChange={handleChange} type="password" className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
                </div>
                <div
                    className='cursor-pointer w-max mt-6 text-white bg-btn hover:bg-btn-hover transition duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'>
                    <button onClick={handleSubmit}>Login</button>
                </div>
                <div className='mt-4 text-sm'>Don't have an account?
                    <Link to="/sign-up" className='mx-2 text-white hover:text-gray-300 transition duration-200'>Sign Up</Link>
                </div>
            </div>
            <div className="h-12"></div>
        </>
    )
}
