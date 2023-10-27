import {Link} from 'react-router-dom'
import React from 'react'
import ApiClient from "../../services/ApiClient.js";
import {MdDoneOutline} from 'react-icons/md'
import {toast} from "react-hot-toast";
import {AiOutlineCloudUpload} from 'react-icons/ai'

export default function SignUp({loading, setLoading}) {

    let [formData, setFormData] = React.useState({
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        country_code: "AF",
    });

    let [response, setResponse] = React.useState()

    const [formErrors, setFormErrors] = React.useState({});

    const inputValidation = (input) => {
        return (formErrors[input] !== undefined && <div className='text-orange-400 text-sm mt-1'>{formErrors[input][0]}</div>);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => {
            return {...prevData, [name]: value};
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        formData.validate_all = true;

        try {
            ApiClient().post('/register', {
                username: formData.username,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                email: formData.email,
                country_code: formData.country_code
            }).then((res) => {
                setResponse(res);
                toast.success(response.data.message);
                setLoading(false)
            }).catch(err => {
                setFormErrors(err.response.data.data);
                toast.error(err.response.data.message);
                setLoading(false)
            })
        } catch (err) {
        }

    };

    let resetLoading = () => {
        setLoading(false)
    }


    // Drag & Drop
    const [isDragOver, setIsDragOver] = React.useState(false);


    // Drag & Drop

    return (
        <>
            {response === undefined && <div className="text-center text-xl mx-2 my-6 text-gray-200"> Create new account</div>}

            <div className={`p-6 bg-app-black/50 rounded-md text-gray-300 overflow-hidden`}>
                <form onSubmit={handleSubmit}>
                    <div className={(response && response.data.status === "success") ? "hidden" : ""}>
                        <header className='border-b-2 pb-[10px] font-bold text-xl'>Sign Up</header>
                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={handleInputChange}
                                name='username'
                                value={formData.username}
                                type="text"
                                className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'
                                autoComplete="one-time-code"
                                required="required"/>
                            {inputValidation('username')}
                        </div>
                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="password">Password</label>
                            <input autoComplete='one-time-code' onChange={handleInputChange}
                                name='password'
                                value={formData.password}
                                type="password"
                                className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
                            {inputValidation('password')}
                        </div>
                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="password">Confirm Password</label>
                            <input autoComplete='one-time-code' onChange={handleInputChange}
                                name='password_confirmation'
                                value={formData.password_confirmation}
                                type="password"
                                className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
                            {inputValidation('password_confirmation')}
                        </div>
                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="email">Email Address (No Spam!)</label>
                            <input autoComplete='one-time-code' onChange={handleInputChange}
                                name='email'
                                value={formData.email}
                                type="email"
                                className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>

                            {inputValidation('email')}
                        </div>
                        <div className='mt-6 flex flex-col relative'>
                            <label htmlFor="country">Country</label>
                            <select onChange={handleInputChange}
                                    name='country_code'
                                    value={formData.country_code}
                                    className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'>
                                <option value="AF">Afghanistan</option>
                                <option value="AF">Afghanistan</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AS">AmericanSamoa</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AI">Anguilla</option>
                                <option value="AG">Antigua and Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BM">Bermuda</option>
                                <option value="BT">Bhutan</option>
                                <option value="BA">Bosnia and Herzegovina</option>
                                <option value="BW">Botswana</option>
                                <option value="BR">Brazil</option>
                                <option value="IO">British Indian Ocean Territory</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="CV">Cape Verde</option>
                                <option value="KY">Cayman Islands</option>
                                <option value="CF">Central African Republic</option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CX">Christmas Island</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoros</option>
                                <option value="CG">Congo</option>
                                <option value="CK">Cook Islands</option>
                                <option value="CR">Costa Rica</option>
                                <option value="HR">Croatia</option>
                                <option value="CU">Cuba</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FO">Faroe Islands</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="GF">French Guiana</option>
                                <option value="PF">French Polynesia</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GR">Greece</option>
                                <option value="GL">Greenland</option>
                                <option value="GD">Grenada</option>
                                <option value="GP">Guadeloupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bissau</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="HN">Honduras</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MQ">Martinique</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="YT">Mayotte</option>
                                <option value="MX">Mexico</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="ME">Montenegro</option>
                                <option value="MS">Montserrat</option>
                                <option value="MA">Morocco</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="AN">Netherlands Antilles</option>
                                <option value="NC">New Caledonia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="NU">Niue</option>
                                <option value="NF">Norfolk Island</option>
                                <option value="MP">Northern Mariana Islands</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="RO">Romania</option>
                                <option value="RW">Rwanda</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="ZA">South Africa</option>
                                <option value="GS">South Georgia and the South Sandwich Islands</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SZ">Swaziland</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TH">Thailand</option>
                                <option value="TG">Togo</option>
                                <option value="TK">Tokelau</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad and Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TC">Turks and Caicos Islands</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="WF">Wallis and Futuna</option>
                                <option value="YE">Yemen</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                                <option value="AX">land Islands</option>
                                <option value="AQ">Antarctica</option>
                                <option value="BO">Bolivia</option>
                                <option value="BN">Brunei Darussalam</option>
                                <option value="CC">Cocos (Keeling) Islands</option>
                                <option value="CD">Congo</option>
                                <option value="CI">{'Cote d\'Ivoire'}</option>
                                <option value="FK">Falkland Islands (Malvinas)</option>
                                <option value="GG">Guernsey</option>
                                <option value="VA">Holy See (Vatican City State)</option>
                                <option value="HK">Hong Kong</option>
                                <option value="IR">Iran</option>
                                <option value="IM">Isle of Man</option>
                                <option value="JE">Jersey</option>
                                <option value="KP">North Korea</option>
                                <option value="KR">South Korea</option>
                                <option value="LA">{'Lao People\'s Democratic Republic'}</option>
                                <option value="LY">Libyan Arab Jamahiriya</option>
                                <option value="MO">Macao</option>
                                <option value="MK">Macedonia</option>
                                <option value="FM">Micronesia</option>
                                <option value="MD">Moldova</option>
                                <option value="MZ">Mozambique</option>
                                <option value="PS">Palestinian Territory,</option>
                                <option value="PN">Pitcairn</option>
                                <option value="RE">Réunion</option>
                                <option value="RU">Russia</option>
                                <option value="BL">Saint Barthélemy</option>
                                <option value="SH">Saint Helena</option>
                                <option value="KN">Saint Kitts and Nevis</option>
                                <option value="LC">Saint Lucia</option>
                                <option value="MF">Saint Martin</option>
                                <option value="PM">Saint Pierre and Miquelon</option>
                                <option value="VC">Saint Vincent and the Grenadines</option>
                                <option value="ST">Sao Tome and Principe</option>
                                <option value="SO">Somalia</option>
                                <option value="SJ">Svalbard and Jan Mayen</option>
                                <option value="SY">Syrian Arab Republic</option>
                                <option value="TW">Taiwan</option>
                                <option value="TZ">Tanzania</option>
                                <option value="TL">Timor-Leste</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Viet Nam</option>
                                <option value="VG">British Virgin Islands</option>
                                <option value="VI">US Virgin Islands</option>

                            </select>
                            {inputValidation('country_code')}

                        </div>
                        <div className='mt-6 flex flex-col  '>
                            <label htmlFor="upload">Profile Picture</label>
                            <label
                            htmlFor="upload-image"
                            className={`relative group mt-2 h-24 w-24 border-dashed bg-gray-700/20 border transition ${isDragOver ? "border-gray-400" : "border-gray-600"} transition cursor-pointer text-2xl rounded flex justify-center items-center group`}
                            onDragOver={() => {setIsDragOver(true)}}
                            onDrop={() => {setIsDragOver(true)}}
                            onDragLeave={() => {setIsDragOver(false)}}
                            >
                                <input 
                                    id='upload-image'
                                    type='file'
                                    accept='.jpg, .jpeg, .png,'
                                    title='Custom'
                                    className='hidden'
                                />
                            <AiOutlineCloudUpload className={`mx-3 font-bold transition transform w-12 h-12 ${isDragOver ? "scale-110" : "scale-100"} text-gray-300 ${isDragOver ? "w-14 h-14" : "w-12 h-12"}`}/>

                            </label>
                        </div>
                        <button onClick={handleSubmit}
                                className={`cursor-pointer w-max mt-6 text-gray-200 bg-btn hover:bg-btn-hover transition font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${loading ? 'disabled-button hover:bg-[#282c39]' : ''}`}
                                disabled={loading}
                        >

                            {loading ?
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing Up...
                                </> : <>Sign Up</>
                            }

                        </button>
                        <div className='mt-4 text-sm text-gray-400'>Already have an account?
                            <Link to="/login" className='mx-2 text-gray-200 hover:text-gray-300 transition'>Login</Link>
                        </div>
                    </div>
                </form>

                {
                    ((response && response.data.status === "success") &&
                        <div className='flex flex-col my-10 justify-center items-center'>
                            <MdDoneOutline className='bg-gray-500 rounded-full w-20 h-20 p-3'/>
                            <h2 className='text-gray-400 text-2xl mt-12'>Success!</h2>
                            <div className='text-gray-400 text-md mx-4 mt-6'>You have registered for your account</div>
                            <Link to="/login" className='text-gray-400 hover:text-gray-300 transition mt-12'>
                                <span
                                    onClick={resetLoading}
                                    className="text-sm p-[16px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 transition">Login to your account</span>
                            </Link>
                        </div>
                    )
                }
            </div>
            
        </>
    )
}
