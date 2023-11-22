import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext.jsx';
import ApiClient from '../../services/ApiClient.js';
import { toast } from 'react-hot-toast';

export default function Login() {
    const { updateUser } = useAuth();
    const navigate = useNavigate();

    let [loading, setLoading] = React.useState(false)

    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        ApiClient()
            .post('/login', {
                username: formData.username,
                password: formData.password,
            })
            .then((response) => {
                window.appData.notifications = response.data.data.notifications;
                updateUser(response.data.data);
                toast.success(response.data.message);
                navigate('/');
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                setLoading(false);
            });
    };

    return (

        <>
            <header className="border-b-[1px] border-[#494a4f] pb-2 text-xl font-bold">Login</header>
            <div className={`mx-auto w-full max-w-screen-xl mt-4 overflow-hidden rounded-md bg-opacity-60 p-6 text-gray-300 bg-app-black`}>
                <form onSubmit={handleSubmit}>
                    <div className="mt-6 flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            type="text"
                            autoComplete="one-time-code"
                            className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                        />
                    </div>
                    <div className="mt-6 flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            autoComplete="one-time-code"
                            className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                        />
                    </div>
                    <button
                        type="submit"  // This makes the button submit the form
                        className={`cursor-pointer w-max mt-6 text-white bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${
                            loading ? 'disabled:bg-[#282c39] dsiabled:text-[#bababa] disabled:cursor-not-allowed hover:bg-[#282c39]' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="mr-3 -ml-1 inline-block h-5 w-5 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Logging in...
                            </>
                        ) : (
                            <>Login</>
                        )}
                    </button>
                    <div className="mt-4 text-sm text-gray-400">
                        Don't have an account?
                        <Link to="/signup" className="mx-2 text-gray-200 transition hover:text-gray-300">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
