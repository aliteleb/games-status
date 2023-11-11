import React, { useEffect } from "react";
import Select from "react-select";
import { useAuth } from "../api/AuthContext";
import ApiClient from "../../services/ApiClient";
import { toast } from "react-hot-toast";
import { countriesOptions, inputValidation } from "../helpers/General";
import { RiLoader3Line } from "react-icons/ri";
import { BiSolidCloudUpload } from "react-icons/bi";
import {CgSpinnerTwoAlt} from "react-icons/cg"

function Profile() {
    const { updateUser, user } = useAuth();

    const [avatarLoading, setAvatarLoading] = React.useState(false);
    const [detailsLoading, setDetailsLoading] = React.useState(false);
    const [emailLoading, setEmailLoading] = React.useState(false);
    const [securityLoading, setSecurityLoading] = React.useState(false);

    const [avatarFormErrors, setAvatarFormErrors] = React.useState(null);
    const [detailsFormErrors, setDetailsFormErrors] = React.useState(null);
    const [securityFormErrors, setSecurityFormErrors] = React.useState(null);
    const [emailFormErrors, setEmailFormErrors] = React.useState(null);
    let [avatarFormData, setAvatarFormData] = React.useState({
        avatar: ""
    });

    let [detailsFormData, setDetailsFormData] = React.useState({
        display_name: "",
        username: "",
        country_code: "AF",
        country_obj: countriesOptions[0]
    });

    let [emailFormData, setEmailFormData] = React.useState({
        email: ""
    });

    let [passwordFormData, setPasswordFormData] = React.useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: ""
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
            country_code: country_obj
        });
    }, [user]);

    const styles = `
    .react-select-container .react-select__control{
        background-color: #00000033;
        border: 1px solid #61656c;
    }
    `;

    let handleAvatar = (e) => {
        e.preventDefault();

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
        e.preventDefault()

        setDetailsFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    let handleEmailChange = (e) => {
        setEmailFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handelPasswordChange = (e) => {
        setPasswordFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
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
                    setAvatarFormData({ ...avatarFormData, avatar: file });
                };

                reader.readAsDataURL(file);
            }
        }

    };
    let handleAvatarSubmit = (e) => {
        e.preventDefault();
        setAvatarLoading(true)

        ApiClient().post("/user/avatar/update", {
            avatar: avatarFormData.avatar
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            setAvatarFormErrors(null);
            updateUser(null);
            updateUser(res.data.data);
            toast.success(res.data.message);
            setAvatarLoading(false)
        })
            .catch((err) => {
                setAvatarFormErrors(err.response.data.data)
                setAvatarLoading(false)
            });
    };

    let handleDetailsSubmit = (e) => {
        e.preventDefault();
        setDetailsLoading(true)

        ApiClient()
            .put("/user/update", {
                display_name: detailsFormData.display_name,
                username: detailsFormData.username,
                country_code: detailsFormData.country_code.value
            })
            .then((res) => {
                setDetailsFormErrors(null);
                updateUser(res.data.data);
                toast.success(res.data.message);
                setDetailsFormData({
                    display_name: "",
                    username: "",
                    country_code: ""
                });

                setDetailsLoading(false)
            })
            .catch((err) => {
                setDetailsFormErrors(err.response.data.data)
                setDetailsLoading(false)
            });
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setEmailLoading(true)

        ApiClient()
            .post("/user/email/update", emailFormData)
            .then((res) => {
                updateUser(res.data.data);
                setEmailFormErrors(null);
                toast.success(res.data.message);
                setEmailFormData({ email: "" });
                setEmailLoading(false)
            })
            .catch((err) => {
                setEmailFormErrors(err.response.data.data)
                setEmailLoading(false)
            });
    };

    const handleSecuritySubmit = (e) => {
        e.preventDefault();
        setSecurityLoading(true)

        ApiClient()
            .post("/user/password/update", passwordFormData)
            .then((res) => {
                setSecurityFormErrors(null);
                toast.success(res.data.message);
                setPasswordFormData({
                    current_password: "",
                    new_password: "",
                    new_password_confirmation: ""
                });
                setSecurityLoading(false)
            })
            .catch((err) => {
                setSecurityFormErrors(err.response.data.data)
                setSecurityLoading(false)
            });
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <h1 className="border-b-[1px] border-[#494a4f] pb-1 text-xl font-bold">
                Edit Profile
            </h1>
            <div className="mt-4 gap-x-4">
                <div className="flex justify-between gap-x-3">
                    <form className="flex w-1/3 max-w-screen-xl flex-col rounded-md p-6 text-gray-300 bg-app-black/50">
                        <h1 className="border-b-[1px] border-[#494a4f] pb-3 text-lg font-bold"> Profile Picture </h1>
                        <div className="flex flex-col justify-between h-full">
                            <div className="mt-6 flex flex-col items-center">
                                <label htmlFor="upload" className="text-sm font-bold text-gray-400">
                                    <div className="block text-center">Accepts</div>
                                    <span className="mx-3 text-sm text-gray-500"> jpg, png, gif </span>
                                </label>
                                <img
                                    className={`mt-4 h-28 w-28 rounded-full border-2 border-dashed cursor-pointer hover:border-gray-300 ${isDragOver ? "border-gray-300" : "border-gray-500"}`}
                                    onDragOver={(e) => {
                                        setIsDragOver(true);
                                        e.preventDefault();
                                    }}
                                    onDrop={handleDrop}
                                    onDragLeave={() => {
                                        setIsDragOver(false);
                                    }}
                                    src={avatarFormData.avatar ? URL.createObjectURL(avatarFormData.avatar) : user?.avatar}
                                    alt="avatar"
                                    onClick={() => {
                                        document.getElementById("avatar").click();
                                    }}
                                />
                                <div className="text-sm py-3 text-gray-400">100px <span className="text-gray-500 font-bold">x</span> 100px</div>
                                <label
                                    htmlFor="avatar"
                                    className={` cursor-pointer w-max mt-6 text-gray-100 bg-red-700 hover:bg-red-600 transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2`}>
                                    <input
                                        onChange={handleAvatar}
                                        id="avatar"
                                        name="avatar"
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        className="hidden"
                                    />
                                    <BiSolidCloudUpload className="inline-block w-6 h-6 mx-1" />
                                    Upload New Photo
                                </label>
                                {inputValidation("avatar", avatarFormErrors)}

                            </div>
                            <button
                                onClick={handleAvatarSubmit}
                                className={`self-start app-btn disabled:hover:bg-red-700 ${
                                    avatarLoading ? "disabled-button hover:bg-[#282c39]" : ""
                                }`}
                                disabled={avatarLoading}>
                                {avatarLoading ? (
                                <div className="flex items-center gap-x-1">
                                    <CgSpinnerTwoAlt className="animate-spin w-5 h-5"/> Saving...
                                </div>) : "Save Changes"}
                            </button>
                        </div>

                    </form>
                    <form className="w-2/3 max-w-screen-xl rounded-md p-6 text-gray-300 bg-app-black/50">
                        <h1 className="border-b-[1px] border-[#494a4f] pb-3 text-lg font-bold"> General </h1>
                        <div className="relative mt-12 flex flex-col">
                            <label htmlFor="display_name">Display Name</label>
                            <input
                                onChange={handleDetailsChange}
                                name="display_name"
                                value={detailsFormData.display_name}
                                type="text"
                                className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                                autoComplete="one-time-code"
                                required="required"
                            />
                            {inputValidation("display_name", detailsFormErrors)}
                        </div>

                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={handleDetailsChange}
                                name="username"
                                value={detailsFormData.username}
                                defaultValue={user?.username}
                                type="text"
                                className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                                autoComplete="one-time-code"
                                required="required"
                            />
                            {inputValidation("username", detailsFormErrors)}
                        </div>

                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="country">Country</label>
                            <Select
                                options={countriesOptions}
                                name="country_code"
                                onChange={(selectedOption) => {
                                    setDetailsFormData({
                                        ...detailsFormData,
                                        country_code: selectedOption
                                    });
                                }}
                                defaultValue={{
                                    label: "Afghanistan",
                                    value: "AF"
                                }}
                                value={detailsFormData.country_code}
                                className="mt-2 react-select-container"
                                classNamePrefix="react-select"
                            />
                            {inputValidation("country_code", detailsFormErrors)}
                        </div>

                        <div className="relative mt-6 flex flex-col opacity-30">
                            <label htmlFor="country">Gender</label>
                            <Select
                                isDisabled={true}
                                className="mt-2 react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>

                        <button
                            className={`app-btn disabled:hover:bg-red-700 ${
                                detailsLoading
                                    ? "disabled-button hover:bg-[#282c39]"
                                    : ""
                            }`}
                            disabled={detailsLoading}
                            onClick={handleDetailsSubmit}
                        >
                            {detailsLoading ? (
                                <div className="flex items-center gap-x-1">
                                    <CgSpinnerTwoAlt className="animate-spin w-5 h-5"/>Saving...
                                </div>
                            ) : (
                                <>Save Changes</>
                            )}
                        </button>
                    </form>
                </div>

                <div className="flex gap-x-3">
                    <form className="mx-auto mt-6 w-1/2 max-w-screen-xl rounded-md p-6 text-gray-300 bg-app-black/50">
                        <h1 className="border-b-[1px] border-[#494a4f] pb-3 text-lg font-bold"> Change Email </h1>
                        <div className="relative mt-6 flex flex-col">
                            <label>New Email Address (No Spam!)</label>
                            <input
                                autoComplete="one-time-code"
                                onChange={handleEmailChange}
                                name="email"
                                value={emailFormData.email}
                                type="email"
                                className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                            />
                            {inputValidation("email", emailFormErrors)}
                        </div>
                        <button
                            className="app-btn disabled:hover:bg-red-700"
                            disabled={emailLoading}
                            onClick={handleEmailSubmit}
                        >
                            {emailLoading ? (
                                <div className="flex items-center gap-x-1">
                                    <CgSpinnerTwoAlt className="animate-spin w-5 h-5"/>
                                    Saving...
                                </div>
                            ) : (
                                <>Save Changes</>
                            )}
                        </button>
                    </form>
                    <form className="mx-auto mt-6 w-1/2 max-w-screen-xl rounded-md p-6 text-gray-300 bg-app-black/50">
                        <h1 className="border-b-[1px] border-[#494a4f] pb-3 text-lg font-bold"> Change Password </h1>
                        <div className="relative mt-12 flex flex-col">
                            <label htmlFor="password">Current Password</label>
                            <input
                                autoComplete="one-time-code"
                                onChange={handelPasswordChange}
                                name="current_password"
                                value={passwordFormData.password}
                                type="password"
                                className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                            />
                            {inputValidation(
                                "current_password",
                                securityFormErrors
                            )}
                        </div>

                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="password">New Password</label>
                            <input
                                autoComplete="one-time-code"
                                onChange={handelPasswordChange}
                                name="new_password"
                                value={passwordFormData.new_password}
                                type="password"
                                className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                            />
                            {inputValidation(
                                "new_password",
                                securityFormErrors
                            )}
                        </div>

                        <div className="relative mt-6 flex flex-col">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                autoComplete="one-time-code"
                                onChange={handelPasswordChange}
                                name="new_password_confirmation"
                                value={passwordFormData.password_confirmation}
                                type="password"
                                className="mt-2 h-12 rounded bg-black/20 px-4 text-sm ring-1 ring-gray-400/50 focus:outline-none focus:ring-gray-500"
                            />
                            {inputValidation(
                                "new_password_confirmation",
                                securityFormErrors
                            )}
                        </div>
                        <button
                            className={`app-btn disabled:hover:bg-red-700 ${
                                securityLoading
                                    ? "disabled-button hover:bg-[#282c39]"
                                    : ""
                            }`}
                            disabled={securityLoading}
                            onClick={handleSecuritySubmit}
                        >
                            {securityLoading ? (
                                <div className="flex items-center gap-x-1">
                                    <CgSpinnerTwoAlt className="animate-spin w-5 h-5"/>
                                    Saving...
                                </div>
                            ) : (
                                <>Save Changes</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;
