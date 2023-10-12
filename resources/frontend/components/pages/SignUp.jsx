import { Link } from 'react-router-dom'
import React from 'react'
import axios from '../api/Axios'
import { useNavigate } from 'react-router-dom'
import Validation from '../validation/Validation'

export default function SignUp() {

  let [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
    country_code: "",
  })

  let navigate = useNavigate()

  let handleChange = (e)=>{
    setUser(prevUser => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }))
  }

  Validation(user)

  let handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      await axios.post('/register', user)
      setUser(prevUser=> ({
        ...prevUser,
        username: "",
        password: "",
        email: "",
        country_code: "",
      }))
      navigate('/login')

    }catch(err){
      console.log("Failed to send user data");
    }
  }

  return (
      <>
        <div className="text-center text-xl mx-2 my-6 text-gray-200"> Create new account </div>
        <div className='w-full max-w-screen-xl mx-auto p-6 bg-custom-black bg-opacity-60 rounded-md text-gray-300'>
          <header className='border-b-2 pb-[10px] font-bold text-xl'>Sign Up</header>
          <div className='mt-6 flex flex-col'>
            <label htmlFor="username">Username</label>
            <input onChange={handleChange} name='username' value={user.username} type="text"  className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
            <p className={`${Validation(user).username === "Valid username" ? "text-green-500" : "text-red-500"}`}>
              {Validation(user).username}
            </p>
          </div>
          <div className='mt-6 flex flex-col'>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} name='password' value={user.password} type="password"  className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
            <p className={`${Validation(user).password === "Password must be at least 8 characters" ? "text-red-500" : ""}`}>
              {Validation(user).password}
            </p>
          </div>
          <div className='mt-6 flex flex-col'>
            <label htmlFor="email">Email Address (No Spam!)</label>
            <input onChange={handleChange} name='email' value={user.email} type="text"  className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
            <p className={`${Validation(user).email === "Valid email address" ? "text-green-500" : "text-red-500"}`}>
              {Validation(user).email}
            </p>
          </div>
          <div className='mt-6 flex flex-col'>
            <label htmlFor="country">Country</label>
            <select onChange={handleChange} name='country_code' value={user.country_code} className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'>
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
          </div>
          <div className='cursor-pointer w-max mt-6 text-white bg-btn hover:bg-btn-hover transition duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'>
            <button onClick={handleSubmit}>Sign Up</button>
          </div>
          <div className='mt-4 text-sm'>Already have an account?
            <Link to="/login" className='mx-2 text-white hover:text-gray-300 transition duration-200'>Login</Link>
          </div>
        </div>
        <div className="h-12"></div>
      </>
  )
}
