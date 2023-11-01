import React, { useEffect } from "react";
import Select from "react-select";
import { useAuth } from "../api/AuthContext";
import ApiClient from "../../services/ApiClient";
import { toast } from "react-hot-toast";
import { countriesOptions, inputValidation } from "../helpers/General";

function Profile() {
    const { updateUser, user } = useAuth();

    const [loading, setLoading] = React.useState(false);
    const [avatarFormErrors, setAvatarFormErrors] = React.useState(null);
    const [detailsFormErrors, setDetailsFormErrors] = React.useState(null);
    const [securityFormErrors, setSecurityFormErrors] = React.useState(null);
    const [emailFormErrors, setEmailFormErrors] = React.useState(null);

    let [avatarFormData, setAvatarFormData] = React.useState({
        avatar: "",
    });

    let [detailsFormData, setDetailsFormData] = React.useState({
        display_name: "",
        username: "",
        country_code: "AF",
        country_obj: countriesOptions[0],
    });

    let [emailFormData, setEmailFormData] = React.useState({
        email: "",
    });

    let [passwordFormData, setPasswordFormData] = React.useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    useEffect(() => {
        let country_obj = countriesOptions[0];
        for (let i = 0; i < countriesOptions.length; i++) {
            if (countriesOptions[i].value === user?.country_code)
                country_obj = countriesOptions[i];
        }
        setDetailsFormData({
            display_name: user?.display_name,
            username: user?.username,
            country_code: country_obj,
        });
    }, [user]);

    const styles = `
    .react-select-container .react-select__control{
        background-color: #00000033;
        border: 1px solid #61656c;
    }
    `;

    let handleAvatar = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setAvatarFormData({ ...avatarFormData, avatar: file });
            };

            reader.readAsDataURL(file);
        }
    };

    let handleDetailsChange = (e) => {
        setDetailsFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    let handleEmailChange = (e) => {
        setEmailFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    let handelPasswordChange = (e) => {
        setPasswordFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Submit Functions

    let handleAvatarSubmit = () => {
        ApiClient().post("", {});
    };

    let handleDetailsSubmit = (e) => {
        e.preventDefault();

        ApiClient()
            .put("/user/update", {
                display_name: detailsFormData.display_name,
                username: detailsFormData.username,
                country_code: detailsFormData.country_code.value,
            })
            .then((res) => {
                setDetailsFormErrors(null);
                updateUser(res.data.data);
                toast.success(res.data.message);
                setDetailsFormData({
                    display_name: "",
                    username: "",
                    country_code: "",
                });
            })
            .catch((err) => setDetailsFormErrors(err.response.data.data));
    };

    let handleEmailSubmit = (e) => {
        e.preventDefault();
        ApiClient()
            .post("/user/email/update", emailFormData)
            .then((res) => {
                updateUser(res.data.data);
                setEmailFormErrors(null);
                toast.success(res.data.message);
                setEmailFormData({ email: "" });
            })
            .catch((err) => setEmailFormErrors(err.response.data.data));
    };

    let handleSecuritySubmit = (e) => {
        e.preventDefault();
        ApiClient()
            .post("/user/password/update", passwordFormData)
            .then((res) => {
                setSecurityFormErrors(null);
                toast.success(res.data.message);
                setPasswordFormData({
                    current_password: "",
                    new_password: "",
                    new_password_confirmation: "",
                });
            })
            .catch((err) => setSecurityFormErrors(err.response.data.data));
    };

    return (
        <>
            <h1 className="text-gray-300 font-bold border-b-2 border-gray-600 pb-2 text-2xl">
                Edit Profile
            </h1>
            <div className="gap-x-4 mt-4">
                <div className="flex justify-between gap-x-3">
                    <form className="flex flex-col w-1/3 items-center pt-32 max-w-screen-xl p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300">
                        <h1>{user?.username}</h1>
                        <div className="mt-2">@Name</div>
                        <div className="mt-6 flex flex-col items-center">
                            <label htmlFor="upload">
                                Profile Picture{" "}
                                <span className="text-xs text-gray-500 mx-3">
                                    [jpg, png, gif] - (100x100)
                                </span>
                            </label>
                            <img
                                className="rounded-full w-28 h-28 mt-4"
                                src={
                                    avatarFormData.avatar &&
                                    URL.createObjectURL(avatarFormData.avatar)
                                }
                                alt="avatar"
                            />
                            <label
                                htmlFor="avatar"
                                className="relative rounded mt-4 h-10 w-44 bg-red-700 transition hover:bg-red-600 transition cursor-pointer text-md flex justify-center items-center"
                            >
                                <input
                                    onChange={handleAvatar}
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    accept=".jpg, .jpeg, .png" // Define the accepted file types
                                    className="hidden "
                                />
                                {inputValidation("avatar", avatarFormErrors)}
                                Upload new image
                            </label>
                            <button
                                // onClick={handleSubmit}
                                className={`cursor-pointer w-max mt-6 text-gray-200 bg-red-700 hover:bg-red-600 transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${
                                    loading
                                        ? "disabled-button hover:bg-[#282c39]"
                                        : ""
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
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>Save</>
                                )}
                            </button>
                        </div>
                    </form>

                    <form className="max-w-screen-xl w-2/3 p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300">
                        <h1 className="font-bold text-xl text-gray-400 border-b-2 border-gray-600 pb-2">
                            General
                        </h1>
                        <div className="mt-12 flex flex-col relative">
                            <label htmlFor="display_name">Display Name</label>
                            <input
                                onChange={handleDetailsChange}
                                name="display_name"
                                value={detailsFormData.display_name}
                                type="text"
                                className="bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm"
                                autoComplete="one-time-code"
                                required="required"
                            />
                            {inputValidation("display_name", detailsFormErrors)}
                        </div>

                        <div className="mt-6 flex flex-col relative">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={handleDetailsChange}
                                name="username"
                                value={detailsFormData.username}
                                defaultValue={user?.username}
                                type="text"
                                className="bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm"
                                autoComplete="one-time-code"
                                required="required"
                            />
                            {inputValidation("username", detailsFormErrors)}
                        </div>

                        <div className="mt-6 flex flex-col relative">
                            <label htmlFor="country">Country</label>
                            <Select
                                options={countriesOptions}
                                name="country_code"
                                onChange={(selectedOption) => {
                                    setDetailsFormData({
                                        ...detailsFormData,
                                        country_code: selectedOption,
                                    });
                                }}
                                defaultValue={{
                                    label: "Afghanistan",
                                    value: "AF",
                                }}
                                value={detailsFormData.country_code}
                                className="react-select-container mt-2"
                                classNamePrefix="react-select"
                            />
                            {inputValidation("country_code", detailsFormErrors)}
                        </div>

                        <div className="mt-6 flex flex-col relative opacity-30">
                            <label htmlFor="country">Gender</label>
                            <Select
                                isDisabled={true}
                                className="react-select-container mt-2 "
                                classNamePrefix="react-select"
                            />
                        </div>

                        <button
                            className={`cursor-pointer w-max mt-6 text-gray-200 bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${
                                loading
                                    ? "disabled-button hover:bg-[#282c39]"
                                    : ""
                            }`}
                            disabled={loading}
                            onClick={handleDetailsSubmit}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                <>Update</>
                            )}
                        </button>
                    </form>
                </div>

                <style dangerouslySetInnerHTML={{ __html: styles }} />

                <div className="flex gap-x-3">
                    <form className="w-1/2 mt-6 max-w-screen-xl mx-auto p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300">
                        <h1 className="font-bold text-gray-400 border-b-2 border-gray-600 pb-2 text-xl">
                            Change Email
                        </h1>
                        <div className="mt-6 flex flex-col relative">
                            <label>New Email Address (No Spam!)</label>
                            <input
                                autoComplete="one-time-code"
                                onChange={handleEmailChange}
                                name="email"
                                value={emailFormData.email}
                                type="email"
                                className="bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm"
                            />
                            {inputValidation("email", emailFormErrors)}
                        </div>
                        <button
                            // onClick={handleSubmit}
                            className={`cursor-pointer w-max mt-6 text-gray-200 bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${
                                loading
                                    ? "disabled-button hover:bg-[#282c39]"
                                    : ""
                            }`}
                            disabled={loading}
                            onClick={handleEmailSubmit}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                <>Update</>
                            )}
                        </button>
                    </form>

                    <form className="w-1/2 mt-6 max-w-screen-xl mx-auto p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300">
                        <h1 className="font-bold text-gray-400 border-b-2 border-gray-600 pb-2 text-xl">
                            Change Password
                        </h1>
                        <div className="mt-12 flex flex-col relative">
                            <label htmlFor="password">Current Password</label>
                            <input
                                autoComplete="one-time-code"
                                onChange={handelPasswordChange}
                                name="current_password"
                                value={passwordFormData.password}
                                type="password"
                                className="bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm"
                            />
                            {inputValidation(
                                "current_password",
                                securityFormErrors,
                            )}
                        </div>

                        <div className="mt-6 flex flex-col relative">
                            <label htmlFor="password">New Password</label>
                            <input
                                autoComplete="one-time-code"
                                onChange={handelPasswordChange}
                                name="new_password"
                                value={passwordFormData.new_password}
                                type="password"
                                className="bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm"
                            />
                            {inputValidation(
                                "new_password",
                                securityFormErrors,
                            )}
                        </div>

                        <div className="mt-6 flex flex-col relative">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                autoComplete="one-time-code"
                                onChange={handelPasswordChange}
                                name="new_password_confirmation"
                                value={passwordFormData.password_confirmation}
                                type="password"
                                className="bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm"
                            />
                            {inputValidation(
                                "new_password_confirmation",
                                securityFormErrors,
                            )}
                        </div>
                        <button
                            className={`cursor-pointer w-max mt-6 text-gray-200 bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${
                                loading
                                    ? "disabled-button hover:bg-[#282c39]"
                                    : ""
                            }`}
                            disabled={loading}
                            onClick={handleSecuritySubmit}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                <>Update</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile
