import React from 'react'
import Select from 'react-select';
import {useAuth} from '../api/AuthContext'
import ApiClient from '../../services/ApiClient'
import {toast} from "react-hot-toast";
import { inputValidation } from '../helpers/General';

function Profile() {

    const {updateUser, user} = useAuth()

    const [loading, setLoading] = React.useState(false)
    const [avatarFormErrors, setAvatarFormErrors] = React.useState(null);
    const [detailsFormErrors, setDetailsFormErrors] = React.useState(null);
    const [securityFormErrors, setSecurityFormErrors] = React.useState(null);
    const [emailFormErrors, setEmailFormErrors] = React.useState(null);

    let [avatarFormData, setAvatarFormData] = React.useState({
        avatar: null,
    });

    let [detailsFormData, setDetailsFormData] = React.useState({
        display_name: null,
        username: null,
        country_code: null,
    })

    let [emailFormData, setEmailFormData] = React.useState({
        email: null,
    })

    let [securityFormData, setSecurityFormData] = React.useState({
        current_password: null,
        new_password: null,
        new_password_confirmation: null,
    })


    const options = [
        {value: 'AF', label: 'Afghanistan'},
        {value: 'AL', label: 'Albania'},
        {value: 'DZ', label: 'Algeria'},
        {value: 'AS', label: 'American Samoa'},
        {value: 'AD', label: 'Andorra'},
        {value: 'AO', label: 'Angola'},
        {value: 'AI', label: 'Anguilla'},
        {value: 'AG', label: 'Antigua and Barbuda'},
        {value: 'AR', label: 'Argentina'},
        {value: 'AM', label: 'Armenia'},
        {value: 'AW', label: 'Aruba'},
        {value: 'AU', label: 'Australia'},
        {value: 'AT', label: 'Austria'},
        {value: 'AZ', label: 'Azerbaijan'},
        {value: 'BS', label: 'Bahamas'},
        {value: 'BH', label: 'Bahrain'},
        {value: 'BD', label: 'Bangladesh'},
        {value: 'BB', label: 'Barbados'},
        {value: 'BY', label: 'Belarus'},
        {value: 'BE', label: 'Belgium'},
        {value: 'BZ', label: 'Belize'},
        {value: 'BJ', label: 'Benin'},
        {value: 'BM', label: 'Bermuda'},
        {value: 'BT', label: 'Bhutan'},
        {value: 'BA', label: 'Bosnia and Herzegovina'},
        {value: 'BW', label: 'Botswana'},
        {value: 'BR', label: 'Brazil'},
        {value: 'IO', label: 'British Indian Ocean Territory'},
        {value: 'BG', label: 'Bulgaria'},
        {value: 'BF', label: 'Burkina Faso'},
        {value: 'BI', label: 'Burundi'},
        {value: 'KH', label: 'Cambodia'},
        {value: 'CM', label: 'Cameroon'},
        {value: 'CA', label: 'Canada'},
        {value: 'CV', label: 'Cape Verde'},
        {value: 'KY', label: 'Cayman Islands'},
        {value: 'CF', label: 'Central African Republic'},
        {value: 'TD', label: 'Chad'},
        {value: 'CL', label: 'Chile'},
        {value: 'CN', label: 'China'},
        {value: 'CX', label: 'Christmas Island'},
        {value: 'CO', label: 'Colombia'},
        {value: 'KM', label: 'Comoros'},
        {value: 'CG', label: 'Congo'},
        {value: 'CK', label: 'Cook Islands'},
        {value: 'CR', label: 'Costa Rica'},
        {value: 'HR', label: 'Croatia'},
        {value: 'CU', label: 'Cuba'},
        {value: 'CY', label: 'Cyprus'},
        {value: 'CZ', label: 'Czech Republic'},
        {value: 'DK', label: 'Denmark'},
        {value: 'DJ', label: 'Djibouti'},
        {value: 'DM', label: 'Dominica'},
        {value: 'DO', label: 'Dominican Republic'},
        {value: 'EC', label: 'Ecuador'},
        {value: 'EG', label: 'Egypt'},
        {value: 'SV', label: 'El Salvador'},
        {value: 'GQ', label: 'Equatorial Guinea'},
        {value: 'ER', label: 'Eritrea'},
        {value: 'EE', label: 'Estonia'},
        {value: 'ET', label: 'Ethiopia'},
        {value: 'FO', label: 'Faroe Islands'},
        {value: 'FJ', label: 'Fiji'},
        {value: 'FI', label: 'Finland'},
        {value: 'FR', label: 'France'},
        {value: 'GF', label: 'French Guiana'},
        {value: 'PF', label: 'French Polynesia'},
        {value: 'GA', label: 'Gabon'},
        {value: 'GM', label: 'Gambia'},
        {value: 'GE', label: 'Georgia'},
        {value: 'DE', label: 'Germany'},
        {value: 'GH', label: 'Ghana'},
        {value: 'GI', label: 'Gibraltar'},
        {value: 'GR', label: 'Greece'},
        {value: 'GL', label: 'Greenland'},
        {value: 'GD', label: 'Grenada'},
        {value: 'GP', label: 'Guadeloupe'},
        {value: 'GU', label: 'Guam'},
        {value: 'GT', label: 'Guatemala'},
        {value: 'GN', label: 'Guinea'},
        {value: 'GW', label: 'Guinea-Bissau'},
        {value: 'GY', label: 'Guyana'},
        {value: 'HT', label: 'Haiti'},
        {value: 'HN', label: 'Honduras'},
        {value: 'HU', label: 'Hungary'},
        {value: 'IS', label: 'Iceland'},
        {value: 'IN', label: 'India'},
        {value: 'ID', label: 'Indonesia'},
        {value: 'IQ', label: 'Iraq'},
        {value: 'IE', label: 'Ireland'},
        {value: 'IT', label: 'Italy'},
        {value: 'JM', label: 'Jamaica'},
        {value: 'JP', label: 'Japan'},
        {value: 'JO', label: 'Jordan'},
        {value: 'KZ', label: 'Kazakhstan'},
        {value: 'KE', label: 'Kenya'},
        {value: 'KI', label: 'Kiribati'},
        {value: 'KW', label: 'Kuwait'},
        {value: 'KG', label: 'Kyrgyzstan'},
        {value: 'LV', label: 'Latvia'},
        {value: 'LB', label: 'Lebanon'},
        {value: 'LS', label: 'Lesotho'},
        {value: 'LR', label: 'Liberia'},
        {value: 'LI', label: 'Liechtenstein'},
        {value: 'LT', label: 'Lithuania'},
        {value: 'LU', label: 'Luxembourg'},
        {value: 'MG', label: 'Madagascar'},
        {value: 'MW', label: 'Malawi'},
        {value: 'MY', label: 'Malaysia'},
        {value: 'MV', label: 'Maldives'},
        {value: 'ML', label: 'Mali'},
        {value: 'MT', label: 'Malta'},
        {value: 'MH', label: 'Marshall Islands'},
        {value: 'MQ', label: 'Martinique'},
        {value: 'MR', label: 'Mauritania'},
        {value: 'MU', label: 'Mauritius'},
        {value: 'YT', label: 'Mayotte'},
        {value: 'MX', label: 'Mexico'},
        {value: 'MC', label: 'Monaco'},
        {value: 'MN', label: 'Mongolia'},
        {value: 'ME', label: 'Montenegro'},
        {value: 'MS', label: 'Montserrat'},
        {value: 'MA', label: 'Morocco'},
        {value: 'MM', label: 'Myanmar'},
        {value: 'NA', label: 'Namibia'},
        {value: 'NR', label: 'Nauru'},
        {value: 'NP', label: 'Nepal'},
        {value: 'NL', label: 'Netherlands'},
        {value: 'AN', label: 'Netherlands Antilles'},
        {value: 'NC', label: 'New Caledonia'},
        {value: 'NZ', label: 'New Zealand'},
        {value: 'NI', label: 'Nicaragua'},
        {value: 'NE', label: 'Niger'},
        {value: 'NG', label: 'Nigeria'},
        {value: 'NU', label: 'Niue'},
        {value: 'NF', label: 'Norfolk Island'},
        {value: 'MP', label: 'Northern Mariana Islands'},
        {value: 'NO', label: 'Norway'},
        {value: 'OM', label: 'Oman'},
        {value: 'PK', label: 'Pakistan'},
        {value: 'PW', label: 'Palau'},
        {value: 'PA', label: 'Panama'},
        {value: 'PG', label: 'Papua New Guinea'},
        {value: 'PY', label: 'Paraguay'},
        {value: 'PE', label: 'Peru'},
        {value: 'PH', label: 'Philippines'},
        {value: 'PL', label: 'Poland'},
        {value: 'PT', label: 'Portugal'},
        {value: 'PR', label: 'Puerto Rico'},
        {value: 'QA', label: 'Qatar'},
        {value: 'RO', label: 'Romania'},
        {value: 'RW', label: 'Rwanda'},
        {value: 'WS', label: 'Samoa'},
        {value: 'SM', label: 'San Marino'},
        {value: 'SA', label: 'Saudi Arabia'},
        {value: 'SN', label: 'Senegal'},
        {value: 'RS', label: 'Serbia'},
        {value: 'SC', label: 'Seychelles'},
        {value: 'SL', label: 'Sierra Leone'},
        {value: 'SG', label: 'Singapore'},
        {value: 'SK', label: 'Slovakia'},
        {value: 'SI', label: 'Slovenia'},
        {value: 'SB', label: 'Solomon Islands'},
        {value: 'ZA', label: 'South Africa'},
        {value: 'GS', label: 'South Georgia and the South Sandwich Islands'},
        {value: 'ES', label: 'Spain'},
        {value: 'LK', label: 'Sri Lanka'},
        {value: 'SD', label: 'Sudan'},
        {value: 'SR', label: 'Suriname'},
        {value: 'SZ', label: 'Swaziland'},
        {value: 'SE', label: 'Sweden'},
        {value: 'CH', label: 'Switzerland'},
        {value: 'TJ', label: 'Tajikistan'},
        {value: 'TH', label: 'Thailand'},
        {value: 'TG', label: 'Togo'},
        {value: 'TK', label: 'Tokelau'},
        {value: 'TO', label: 'Tonga'},
        {value: 'TT', label: 'Trinidad and Tobago'},
        {value: 'TN', label: 'Tunisia'},
        {value: 'TR', label: 'Turkey'},
        {value: 'TM', label: 'Turkmenistan'},
        {value: 'TC', label: 'Turks and Caicos Islands'},
        {value: 'TV', label: 'Tuvalu'},
        {value: 'UG', label: 'Uganda'},
        {value: 'UA', label: 'Ukraine'},
        {value: 'AE', label: 'United Arab Emirates'},
        {value: 'GB', label: 'United Kingdom'},
        {value: 'US', label: 'United States'},
        {value: 'UY', label: 'Uruguay'},
        {value: 'UZ', label: 'Uzbekistan'},
        {value: 'VU', label: 'Vanuatu'},
        {value: 'WF', label: 'Wallis and Futuna'},
        {value: 'YE', label: 'Yemen'},
        {value: 'ZM', label: 'Zambia'},
        {value: 'ZW', label: 'Zimbabwe'},
        {value: 'AX', label: 'Åland Islands'},
        {value: 'AQ', label: 'Antarctica'},
        {value: 'BO', label: 'Bolivia'},
        {value: 'BN', label: 'Brunei Darussalam'},
        {value: 'CC', label: 'Cocos (Keeling) Islands'},
        {value: 'CD', label: 'Congo'},
        {value: 'FK', label: 'Falkland Islands (Malvinas)'},
        {value: 'GG', label: 'Guernsey'},
        {value: 'VA', label: 'Holy See (Vatican City State)'},
        {value: 'HK', label: 'Hong Kong'},
        {value: 'IR', label: 'Iran'},
        {value: "IM", label: "Isle of Man"},
        {value: "JE", label: "Jersey"},
        {value: "KP", label: "North Korea"},
        {value: "KR", label: "South Korea"},
        {value: "LA", label: "Lao People's Democratic Republic"},
        {value: "LY", label: "Libyan Arab Jamahiriya"},
        {value: "MO", label: "Macao"},
        {value: "MK", label: "Macedonia"},
        {value: "FM", label: "Micronesia"},
        {value: "MD", label: "Moldova"},
        {value: "MZ", label: "Mozambique"},
        {value: "PS", label: "Palestinian Territory"},
        {value: "PN", label: "Pitcairn"},
        {value: "RE", label: "Réunion"},
        {value: "RU", label: "Russia"},
        {value: "BL", label: "Saint Barthélemy"},
        {value: "SH", label: "Saint Helena"},
        {value: "KN", label: "Saint Kitts and Nevis"},
        {value: "LC", label: "Saint Lucia"},
        {value: "MF", label: "Saint Martin"},
        {value: "PM", label: "Saint Pierre and Miquelon"},
        {value: "VC", label: "Saint Vincent and the Grenadines"},
        {value: "ST", label: "Sao Tome and Principe"},
        {value: "SO", label: "Somalia"},
        {value: "SJ", label: "Svalbard and Jan Mayen"},
        {value: "SY", label: "Syrian Arab Republic"},
        {value: "TW", label: "Taiwan"},
        {value: "TZ", label: "Tanzania"},
        {value: "TL", label: "Timor-Leste"},
        {value: "VE", label: "Venezuela"},
        {value: "VN", label: "Viet Nam"},
        {value: "VG", label: "British Virgin Islands"},
        {value: "VI", label: "US Virgin Islands"}
    ]

    const styles = `
    .react-select-container .react-select__control{
        background-color: #00000033;
        border: 1px solid #61656c;
    }
    `;

    let handleAvatar = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setAvatarFormData({...avatarFormData, avatar: file});
            };

            reader.readAsDataURL(file);
        }
    }
    
    let handleDetailsChange = (e) => {
        setDetailsFormData(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    let handleEmailChange = (e) => {
        setEmailFormData(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    let handelSecurityChange = (e) => {
        setSecurityFormData(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    // Submit Functions

    let handleAvatarSubmit = () => {
        ApiClient().post('',
        {

        }
        )
    }

    let handleDetailsSubmit = (e) => {
        e.preventDefault()
        ApiClient().put('/user/update', detailsFormData)
        .then(res => {
            setDetailsFormErrors(null)
            updateUser(res.data.data)
            toast.success(res.data.message)
            setDetailsFormData(
                {
                    display_name: "",
                    username: "",
                    country_code: "",
                }
            )
        })
        .catch(err => 
            setDetailsFormErrors(err.response.data.data)    
        )
    }

    let handleEmailSubmit = (e) => {
        e.preventDefault()
        ApiClient().post('/user/email/update', emailFormData)
        .then(res => {
            updateUser(res.data.data)
            setEmailFormErrors(null)
            toast.success(res.data.message)
            setEmailFormData({email: ""})
        })
        .catch(err => 
            setEmailFormErrors(err.response.data.data)
        )
    }

    let handleSecuritySubmit = (e) => {
        e.preventDefault()
        ApiClient().post('/user/password/update', securityFormData)
        .then(res => {
            setSecurityFormErrors(null)
            toast.success(res.data.message)
            setSecurityFormData(
                {
                    current_password: "",
                    new_password: "",
                    new_password_confirmation: "",
                }
            )
        })
        .catch(err => 
            setSecurityFormErrors(err.response.data.data)
        )
    }
    

    return (
        <>
            <h1 className='text-gray-300 font-bold border-b-2 border-gray-600 pb-2 text-2xl'>Edit Profile</h1>
            <div className='gap-x-4 mt-4'>
                <div className='flex justify-between gap-x-3'>
                    <form className='flex flex-col w-1/3 items-center pt-32 overflow-hidden max-w-screen-xl p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300'>
                        <h1>{user?.username}</h1>
                        <div className='mt-2'>@Name</div>
                        <div className='mt-6 flex flex-col items-center'>
                            <label htmlFor="upload">Profile Picture <span className='text-xs text-gray-500 mx-3'>[jpg, png, gif] - (100x100)</span></label>
                            <img className='rounded-full w-28 h-28 mt-4' src={avatarFormData.avatar && URL.createObjectURL(avatarFormData.avatar)} alt='avatar'/>
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
                                {inputValidation('avatar', avatarFormErrors)}
                                Upload new image
                            </label>
                            <button 
                                // onClick={handleSubmit}
                                className={`cursor-pointer w-max mt-6 text-gray-200 bg-red-700 hover:bg-red-600 transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${loading ? 'disabled-button hover:bg-[#282c39]' : ''}`}
                                disabled={loading}
                            >
                            {loading ?
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </> : <>Save</>
                            }
                            </button>
                        </div>
                    </form>

                    <form className='overflow-hidden max-w-screen-xl w-2/3 p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300'>
                        <h1 className='font-bold text-xl text-gray-400 border-b-2 border-gray-600 pb-2'>General</h1>
                        <div className='mt-12 flex flex-col relative'>
                            <label htmlFor="displat_name">Display Name</label>
                            <input
                                onChange={handleDetailsChange}
                                name='display_name'
                                value={detailsFormData.display_name}
                                defaultValue={user?.display_name}
                                type="text"
                                className='bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm'
                                autoComplete="one-time-code"
                                required="required"/>
                            {inputValidation('display_name', detailsFormErrors)}
                        </div>

                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={handleDetailsChange}
                                name='username'
                                value={detailsFormData.username}
                                defaultValue={user?.username}
                                type="text"
                                className='bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm'
                                autoComplete="one-time-code"
                                required="required"/>
                            {inputValidation('username', detailsFormErrors)}
                        </div>

                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="country">Country</label>
                            <Select
                                options={options}
                                name='country_code'
                                onChange={(selectedOption) => {
                                    setDetailsFormData({...detailsFormData, country_code: selectedOption.value});
                                }}
                                defaultValue={{label: "Afghanistan", value: 'AF'}}
                                className='react-select-container mt-2'
                                classNamePrefix="react-select"
                            />
                            {inputValidation('country_code', detailsFormErrors)}
                        </div>

                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="country">Gender</label>
                            <Select
                                isDisabled="true"
                                className='react-select-container mt-2'
                                classNamePrefix="react-select"
                            />
                        </div>

                        <button 
                                className={`cursor-pointer w-max mt-6 text-gray-200 bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${loading ? 'disabled-button hover:bg-[#282c39]' : ''}`}
                                disabled={loading}
                                onClick={handleDetailsSubmit}
                        >
                            {loading ?
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </> : <>Update</>
                            }
                        </button>
                    </form>
                </div>

                <style dangerouslySetInnerHTML={{__html: styles}}/>


                <div className='flex gap-x-3'>

                    <form className='overflow-hidden w-1/2 mt-6 max-w-screen-xl mx-auto p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300'>
                        <h1 className='font-bold text-gray-400 border-b-2 border-gray-600 pb-2 text-xl'>Change Email</h1>
                        <div className='mt-6 flex flex-col relative'>
                            <label>New Email Address (No Spam!)</label>
                            <input 
                                autoComplete='one-time-code'
                                onChange={handleEmailChange}
                                name='email'
                                value={emailFormData.email}
                                type="email"
                                className='bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm'/>
                            {inputValidation('email', emailFormErrors)}
                        </div>
                        <button 
                                // onClick={handleSubmit}
                                className={`cursor-pointer w-max mt-6 text-gray-200 bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${loading ? 'disabled-button hover:bg-[#282c39]' : ''}`}
                                disabled={loading}
                                onClick={handleEmailSubmit}
                        >
                            {loading ?
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </> : <>Update</>
                            }

                        </button>
                    </form>

                    <form className='overflow-hidden w-1/2 mt-6 max-w-screen-xl mx-auto p-6 bg-app-black bg-opacity-60 rounded-md text-gray-300'>
                        <h1 className='font-bold text-gray-400 border-b-2 border-gray-600 pb-2 text-xl'>Change Password</h1>
                        <div className='mt-12 flex flex-col relative'>
                            <label htmlFor="password">Current Password</label>
                            <input autoComplete='one-time-code' 
                                onChange={handelSecurityChange}
                                name='current_password'
                                value={securityFormData.password}
                                type="password"
                                className='bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm'/>
                            {inputValidation('current_password', securityFormErrors)}
                        </div>

                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="password">New Password</label>
                            <input autoComplete='one-time-code' 
                                onChange={handelSecurityChange}
                                name='new_password'
                                value={securityFormData.new_password}
                                type="password"
                                className='bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm'/>
                            {inputValidation('new_password', securityFormErrors)}
                        </div>

                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="password">Confirm Password</label>
                            <input autoComplete='one-time-code' 
                                onChange={handelSecurityChange}
                                name='new_password_confirmation'
                                value={securityFormData.password_confirmation}
                                type="password"
                                className='bg-black/20 rounded mt-2 h-12 px-4 ring-1 ring-gray-400/50 focus:ring-gray-500 focus:outline-none text-sm'/>
                            {inputValidation('new_password_confirmation', securityFormErrors)}
                        </div>
                        <button 
                                className={`cursor-pointer w-max mt-6 text-gray-200 bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${loading ? 'disabled-button hover:bg-[#282c39]' : ''}`}
                                disabled={loading}
                                onClick={handleSecuritySubmit}
                        >
                            {loading ?
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </> : <>Update</>
                            }

                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Profile