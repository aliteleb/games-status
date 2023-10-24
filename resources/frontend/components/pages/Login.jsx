import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext.jsx';
import ApiClient from '../../services/ApiClient.js';
import { toast } from 'react-hot-toast';

export default function Login({ loading, setLoading }) {
    const { updateUser } = useAuth();
    const navigate = useNavigate();

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
        <div className="w-full overflow-hidden max-w-screen-xl mx-auto p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300">
            <form onSubmit={handleSubmit}>
                <header className="border-b-2 pb-[10px] font-bold text-xl">Login</header>
                <div className="mt-6 flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        type="text"
                        className="bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm"
                    />
                </div>
                <div className="mt-6 flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        className="bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm"
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
                                className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block"
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
                    <Link to="/sign-up" className="mx-2 text-gray-200 hover:text-gray-300 transition">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}
