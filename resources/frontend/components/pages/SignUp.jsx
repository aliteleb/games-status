import { Link } from "react-router-dom";
import React from "react";
import ApiClient from "../../services/ApiClient.js";
import { MdDoneOutline } from "react-icons/md";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { countriesOptions, inputValidation } from "../helpers/General.jsx";
import { useAuth } from '../api/AuthContext.jsx';
import { useNavigate } from "react-router-dom";
import { refreshPageSize } from "../core/BlurredBackground.jsx";

export default function SignUp() {

    const {user} = useAuth()

    let [formData, setFormData] = React.useState({
        username: null,
        password: null,
        password_confirmation: null,
        email: null,
        gender: null,
        country_code: null,
        avatar: null
    });

    let [loading, setLoading] = React.useState(false);

    let [response, setResponse] = React.useState();

    const [formErrors, setFormErrors] = React.useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            return { ...prevData, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        ApiClient().post("/register", {
            username: formData.username,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            email: formData.email,
            gender: formData.gender,
            country_code: formData.country_code,
            avatar: formData.avatar
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            setResponse(res.data);
            refreshPageSize()
            toast.success(res.data.message);
            setLoading(false);
        }).catch(err => {
            setFormErrors(err.response.data.data);
            toast.error(err.response.data.message);
            setLoading(false);
        });


    };

    let resetLoading = () => {
        setLoading(false);
    };


    // Drag & Drop
    const [isDragOver, setIsDragOver] = React.useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;

        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    // Set the image data in the formData state
                    setFormData({ ...formData, avatar: file });
                };

                reader.readAsDataURL(file);
            }
        }

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setFormData({ ...formData, avatar: file });
            };

            reader.readAsDataURL(file);
        }
    };

    const genders = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" }
    ];

    // Define your styles as a string
    const styles = `
    .react-select-container .react-select__control{
        background-color: #00000033;
        border: 1px solid #61656c;
    }
    `;

    return (
        <>
            <div className={`mx-2 my-6 text-center text-xl text-gray-200 ${(response && response.status === "success") ? "hidden" : ""}`}> Create new account</div>

            <header className={`border-b-[1px] border-[#494a4f] pb-2 text-xl font-bold ${(response && response.status === "success") ? "hidden" : ""}`}>Sign Up</header>
            <div className={`p-6 mt-4 bg-app-black/50 rounded-md text-gray-300 overflow-hidden`}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className={(response && response.status === "success") ? "hidden" : ""}>

                        <style dangerouslySetInnerHTML={{ __html: styles }} />

                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={handleInputChange}
                                name="username"
                                value={formData.username}
                                type="text"
                                className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                                autoComplete="one-time-code"
                                required="required" />
                            {inputValidation("username", formErrors)}
                        </div>
                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input autoComplete="one-time-code" onChange={handleInputChange}
                                   name="password"
                                   value={formData.password}
                                   type="password"
                                   className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500" />
                            {inputValidation("password", formErrors)}
                        </div>
                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="password">Confirm Password</label>
                            <input autoComplete="one-time-code" onChange={handleInputChange}
                                   name="password_confirmation"
                                   value={formData.password_confirmation}
                                   type="password"
                                   className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500" />
                            {inputValidation("password_confirmation", formErrors)}
                        </div>
                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="email">Email Address (No Spam!)</label>
                            <input autoComplete="one-time-code" onChange={handleInputChange}
                                   name="email"
                                   value={formData.email}
                                   type="email"
                                   className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500" />

                            {inputValidation("email", formErrors)}
                        </div>
                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="country">Gender</label>
                            <Select
                                options={genders}
                                name="country_code"
                                onChange={(selectedOption) => {
                                    setFormData({ ...formData, gender: selectedOption.value });
                                }}
                                className="mt-2 react-select-container"
                                classNamePrefix="react-select"
                            />
                            {inputValidation("gender", formErrors)}

                        </div>
                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="country">Country</label>
                            <Select
                                options={countriesOptions}
                                name="country_code"
                                onChange={(selectedOption) => {
                                    setFormData({ ...formData, country_code: selectedOption.value });
                                }}
                                // defaultValue={{label: "Afghanistan", value: 'AF'}}
                                className="mt-2 react-select-container"
                                classNamePrefix="react-select"
                            />
                            {inputValidation("country_code", formErrors)}

                        </div>
                        <div className="mt-6 flex flex-col">
                            <label htmlFor="upload">Profile Picture <span className="mx-3 text-xs text-gray-500">[jpg, png, gif] - (100x100)</span></label>
                            <label
                                onDragOver={(e) => {
                                    setIsDragOver(true);
                                    e.preventDefault();
                                }}
                                onDrop={handleDrop}
                                onDragLeave={() => {
                                    setIsDragOver(false);
                                }}
                                htmlFor="avatar"
                                className={`relative group mt-2 h-24 w-24 border-dotted bg-gray-700/20 border-2 transition ${isDragOver ? "border-gray-400" : "border-gray-600"} hover:border-gray-400 transition cursor-pointer text-2xl rounded flex justify-center items-center group`}
                            >
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    accept=".jpg, .jpeg, .png" // Define the accepted file types
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <div style={{
                                    backgroundImage: formData.avatar ? `url(${URL.createObjectURL(formData.avatar)})` : `url('/assets/images/upload-icon.svg')`
                                }} className={`absolute w-full h-full transition bg-no-repeat bg-center ${isDragOver ? "scale-110" : "opacity-75"}`}></div>
                            </label>
                            {inputValidation("avatar", formErrors)}
                        </div>

                        <button onClick={handleSubmit}
                                className={`cursor-pointer w-max mt-6 text-gray-200 bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${loading ? "disabled-button hover:bg-[#282c39]" : ""}`}
                                disabled={loading}
                        >

                            {loading ?
                                <>
                                    <svg className="mr-3 -ml-1 inline-block h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing Up...
                                </> : <>Sign Up</>
                            }

                        </button>
                        <div className="mt-4 text-sm text-gray-400">Already have an account?
                            <Link to="/login" className="mx-2 text-gray-200 transition hover:text-gray-300">Login</Link>
                        </div>
                    </div>
                </form>
                {
                    ((response && response.status === "success") &&
                        <div className="my-10 flex flex-col items-center justify-center">
                            <MdDoneOutline className="h-20 w-20 rounded-full bg-emerald-700 p-3" />
                            <h2 className="mt-12 text-2xl text-gray-400">Success!</h2>
                            <div className="mx-4 mt-6 text-gray-400 text-md">You have registered for your account</div>
                            <Link to="/login" className="mt-12 text-gray-400 transition hover:text-gray-300">
                                <span
                                    onClick={resetLoading}
                                    className="rounded-lg bg-gray-800 px-5 text-sm font-medium text-white transition p-[16px] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300">Login to your account</span>
                            </Link>
                        </div>
                    )
                }
            </div>

        </>
    );
}
