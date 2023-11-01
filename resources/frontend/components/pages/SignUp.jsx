import { Link } from "react-router-dom";
import React from "react";
import ApiClient from "../../services/ApiClient.js";
import { MdDoneOutline } from "react-icons/md";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { inputValidation } from "../helpers/General.jsx";
import { useAuth } from '../api/AuthContext.jsx';
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const {user} = useAuth()
    const navigate = useNavigate()

    const checkUser = () => {
        user ? navigate("/") : null
    }

    checkUser()

    let signUpRef = React.useRef(null)
    React.useEffect( () => {
        !user ? signUpRef.current.classList.remove('hidden') : null
    }, [])

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
            setResponse(res);
            toast.success(response.data.message);
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

    // Drag & Drop
    const options = [
        { value: "AF", label: "Afghanistan" },
        { value: "AL", label: "Albania" },
        { value: "DZ", label: "Algeria" },
        { value: "AS", label: "American Samoa" },
        { value: "AD", label: "Andorra" },
        { value: "AO", label: "Angola" },
        { value: "AI", label: "Anguilla" },
        { value: "AG", label: "Antigua and Barbuda" },
        { value: "AR", label: "Argentina" },
        { value: "AM", label: "Armenia" },
        { value: "AW", label: "Aruba" },
        { value: "AU", label: "Australia" },
        { value: "AT", label: "Austria" },
        { value: "AZ", label: "Azerbaijan" },
        { value: "BS", label: "Bahamas" },
        { value: "BH", label: "Bahrain" },
        { value: "BD", label: "Bangladesh" },
        { value: "BB", label: "Barbados" },
        { value: "BY", label: "Belarus" },
        { value: "BE", label: "Belgium" },
        { value: "BZ", label: "Belize" },
        { value: "BJ", label: "Benin" },
        { value: "BM", label: "Bermuda" },
        { value: "BT", label: "Bhutan" },
        { value: "BA", label: "Bosnia and Herzegovina" },
        { value: "BW", label: "Botswana" },
        { value: "BR", label: "Brazil" },
        { value: "IO", label: "British Indian Ocean Territory" },
        { value: "BG", label: "Bulgaria" },
        { value: "BF", label: "Burkina Faso" },
        { value: "BI", label: "Burundi" },
        { value: "KH", label: "Cambodia" },
        { value: "CM", label: "Cameroon" },
        { value: "CA", label: "Canada" },
        { value: "CV", label: "Cape Verde" },
        { value: "KY", label: "Cayman Islands" },
        { value: "CF", label: "Central African Republic" },
        { value: "TD", label: "Chad" },
        { value: "CL", label: "Chile" },
        { value: "CN", label: "China" },
        { value: "CX", label: "Christmas Island" },
        { value: "CO", label: "Colombia" },
        { value: "KM", label: "Comoros" },
        { value: "CG", label: "Congo" },
        { value: "CK", label: "Cook Islands" },
        { value: "CR", label: "Costa Rica" },
        { value: "HR", label: "Croatia" },
        { value: "CU", label: "Cuba" },
        { value: "CY", label: "Cyprus" },
        { value: "CZ", label: "Czech Republic" },
        { value: "DK", label: "Denmark" },
        { value: "DJ", label: "Djibouti" },
        { value: "DM", label: "Dominica" },
        { value: "DO", label: "Dominican Republic" },
        { value: "EC", label: "Ecuador" },
        { value: "EG", label: "Egypt" },
        { value: "SV", label: "El Salvador" },
        { value: "GQ", label: "Equatorial Guinea" },
        { value: "ER", label: "Eritrea" },
        { value: "EE", label: "Estonia" },
        { value: "ET", label: "Ethiopia" },
        { value: "FO", label: "Faroe Islands" },
        { value: "FJ", label: "Fiji" },
        { value: "FI", label: "Finland" },
        { value: "FR", label: "France" },
        { value: "GF", label: "French Guiana" },
        { value: "PF", label: "French Polynesia" },
        { value: "GA", label: "Gabon" },
        { value: "GM", label: "Gambia" },
        { value: "GE", label: "Georgia" },
        { value: "DE", label: "Germany" },
        { value: "GH", label: "Ghana" },
        { value: "GI", label: "Gibraltar" },
        { value: "GR", label: "Greece" },
        { value: "GL", label: "Greenland" },
        { value: "GD", label: "Grenada" },
        { value: "GP", label: "Guadeloupe" },
        { value: "GU", label: "Guam" },
        { value: "GT", label: "Guatemala" },
        { value: "GN", label: "Guinea" },
        { value: "GW", label: "Guinea-Bissau" },
        { value: "GY", label: "Guyana" },
        { value: "HT", label: "Haiti" },
        { value: "HN", label: "Honduras" },
        { value: "HU", label: "Hungary" },
        { value: "IS", label: "Iceland" },
        { value: "IN", label: "India" },
        { value: "ID", label: "Indonesia" },
        { value: "IQ", label: "Iraq" },
        { value: "IE", label: "Ireland" },
        { value: "IT", label: "Italy" },
        { value: "JM", label: "Jamaica" },
        { value: "JP", label: "Japan" },
        { value: "JO", label: "Jordan" },
        { value: "KZ", label: "Kazakhstan" },
        { value: "KE", label: "Kenya" },
        { value: "KI", label: "Kiribati" },
        { value: "KW", label: "Kuwait" },
        { value: "KG", label: "Kyrgyzstan" },
        { value: "LV", label: "Latvia" },
        { value: "LB", label: "Lebanon" },
        { value: "LS", label: "Lesotho" },
        { value: "LR", label: "Liberia" },
        { value: "LI", label: "Liechtenstein" },
        { value: "LT", label: "Lithuania" },
        { value: "LU", label: "Luxembourg" },
        { value: "MG", label: "Madagascar" },
        { value: "MW", label: "Malawi" },
        { value: "MY", label: "Malaysia" },
        { value: "MV", label: "Maldives" },
        { value: "ML", label: "Mali" },
        { value: "MT", label: "Malta" },
        { value: "MH", label: "Marshall Islands" },
        { value: "MQ", label: "Martinique" },
        { value: "MR", label: "Mauritania" },
        { value: "MU", label: "Mauritius" },
        { value: "YT", label: "Mayotte" },
        { value: "MX", label: "Mexico" },
        { value: "MC", label: "Monaco" },
        { value: "MN", label: "Mongolia" },
        { value: "ME", label: "Montenegro" },
        { value: "MS", label: "Montserrat" },
        { value: "MA", label: "Morocco" },
        { value: "MM", label: "Myanmar" },
        { value: "NA", label: "Namibia" },
        { value: "NR", label: "Nauru" },
        { value: "NP", label: "Nepal" },
        { value: "NL", label: "Netherlands" },
        { value: "AN", label: "Netherlands Antilles" },
        { value: "NC", label: "New Caledonia" },
        { value: "NZ", label: "New Zealand" },
        { value: "NI", label: "Nicaragua" },
        { value: "NE", label: "Niger" },
        { value: "NG", label: "Nigeria" },
        { value: "NU", label: "Niue" },
        { value: "NF", label: "Norfolk Island" },
        { value: "MP", label: "Northern Mariana Islands" },
        { value: "NO", label: "Norway" },
        { value: "OM", label: "Oman" },
        { value: "PK", label: "Pakistan" },
        { value: "PW", label: "Palau" },
        { value: "PA", label: "Panama" },
        { value: "PG", label: "Papua New Guinea" },
        { value: "PY", label: "Paraguay" },
        { value: "PE", label: "Peru" },
        { value: "PH", label: "Philippines" },
        { value: "PL", label: "Poland" },
        { value: "PT", label: "Portugal" },
        { value: "PR", label: "Puerto Rico" },
        { value: "QA", label: "Qatar" },
        { value: "RO", label: "Romania" },
        { value: "RW", label: "Rwanda" },
        { value: "WS", label: "Samoa" },
        { value: "SM", label: "San Marino" },
        { value: "SA", label: "Saudi Arabia" },
        { value: "SN", label: "Senegal" },
        { value: "RS", label: "Serbia" },
        { value: "SC", label: "Seychelles" },
        { value: "SL", label: "Sierra Leone" },
        { value: "SG", label: "Singapore" },
        { value: "SK", label: "Slovakia" },
        { value: "SI", label: "Slovenia" },
        { value: "SB", label: "Solomon Islands" },
        { value: "ZA", label: "South Africa" },
        { value: "GS", label: "South Georgia and the South Sandwich Islands" },
        { value: "ES", label: "Spain" },
        { value: "LK", label: "Sri Lanka" },
        { value: "SD", label: "Sudan" },
        { value: "SR", label: "Suriname" },
        { value: "SZ", label: "Swaziland" },
        { value: "SE", label: "Sweden" },
        { value: "CH", label: "Switzerland" },
        { value: "TJ", label: "Tajikistan" },
        { value: "TH", label: "Thailand" },
        { value: "TG", label: "Togo" },
        { value: "TK", label: "Tokelau" },
        { value: "TO", label: "Tonga" },
        { value: "TT", label: "Trinidad and Tobago" },
        { value: "TN", label: "Tunisia" },
        { value: "TR", label: "Turkey" },
        { value: "TM", label: "Turkmenistan" },
        { value: "TC", label: "Turks and Caicos Islands" },
        { value: "TV", label: "Tuvalu" },
        { value: "UG", label: "Uganda" },
        { value: "UA", label: "Ukraine" },
        { value: "AE", label: "United Arab Emirates" },
        { value: "GB", label: "United Kingdom" },
        { value: "US", label: "United States" },
        { value: "UY", label: "Uruguay" },
        { value: "UZ", label: "Uzbekistan" },
        { value: "VU", label: "Vanuatu" },
        { value: "WF", label: "Wallis and Futuna" },
        { value: "YE", label: "Yemen" },
        { value: "ZM", label: "Zambia" },
        { value: "ZW", label: "Zimbabwe" },
        { value: "AX", label: "Åland Islands" },
        { value: "AQ", label: "Antarctica" },
        { value: "BO", label: "Bolivia" },
        { value: "BN", label: "Brunei Darussalam" },
        { value: "CC", label: "Cocos (Keeling) Islands" },
        { value: "CD", label: "Congo" },
        { value: "FK", label: "Falkland Islands (Malvinas)" },
        { value: "GG", label: "Guernsey" },
        { value: "VA", label: "Holy See (Vatican City State)" },
        { value: "HK", label: "Hong Kong" },
        { value: "IR", label: "Iran" },
        { value: "IM", label: "Isle of Man" },
        { value: "JE", label: "Jersey" },
        { value: "KP", label: "North Korea" },
        { value: "KR", label: "South Korea" },
        { value: "LA", label: "Lao People's Democratic Republic" },
        { value: "LY", label: "Libyan Arab Jamahiriya" },
        { value: "MO", label: "Macao" },
        { value: "MK", label: "Macedonia" },
        { value: "FM", label: "Micronesia" },
        { value: "MD", label: "Moldova" },
        { value: "MZ", label: "Mozambique" },
        { value: "PS", label: "Palestinian Territory" },
        { value: "PN", label: "Pitcairn" },
        { value: "RE", label: "Réunion" },
        { value: "RU", label: "Russia" },
        { value: "BL", label: "Saint Barthélemy" },
        { value: "SH", label: "Saint Helena" },
        { value: "KN", label: "Saint Kitts and Nevis" },
        { value: "LC", label: "Saint Lucia" },
        { value: "MF", label: "Saint Martin" },
        { value: "PM", label: "Saint Pierre and Miquelon" },
        { value: "VC", label: "Saint Vincent and the Grenadines" },
        { value: "ST", label: "Sao Tome and Principe" },
        { value: "SO", label: "Somalia" },
        { value: "SJ", label: "Svalbard and Jan Mayen" },
        { value: "SY", label: "Syrian Arab Republic" },
        { value: "TW", label: "Taiwan" },
        { value: "TZ", label: "Tanzania" },
        { value: "TL", label: "Timor-Leste" },
        { value: "VE", label: "Venezuela" },
        { value: "VN", label: "Viet Nam" },
        { value: "VG", label: "British Virgin Islands" },
        { value: "VI", label: "US Virgin Islands" }
    ];

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
        <div className={`hidden ${user ? "hidden" : "block"}`}>
            {response === undefined && <div className="mx-2 my-6 text-center text-xl text-gray-200"> Create new account</div>}

            <div ref={signUpRef} className={`p-6 bg-app-black/50 rounded-md text-gray-300 overflow-hidden`}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className={(response && response.data.status === "success") ? "hidden" : ""}>

                        <style dangerouslySetInnerHTML={{ __html: styles }} />

                        <header className="border-b-2 text-xl font-bold pb-[10px]">Sign Up</header>
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
                                options={options}
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
                    ((response && response.data.status === "success") &&
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

        </div>
    );
}
