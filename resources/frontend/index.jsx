import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/partials/Navbar.jsx";
import Protections from "./components/pages/Protections.jsx";
import Home from "./components/pages/Home.jsx";
import Games from "./components/pages/Games.jsx";
import NFOS from "./components/pages/NFOS.jsx";
import Markets from "./components/pages/Markets.jsx";
import FreeKeys from "./components/pages/FreeKeys.jsx";
import GetKarma from "./components/pages/GetKarma.jsx";
import Messages from "./components/pages/Messages.jsx";
import Forum from "./components/pages/Forum.jsx";
import Groups from "./components/pages/Groups.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import About from "./components/pages/About.jsx";
import Contact from "./components/pages/Contact.jsx";
import Login from "./components/pages/Login.jsx";
import Terms from "./components/pages/Terms.jsx";
import FrequencyQuestions from "./components/pages/FrequencyQuestions.jsx";
import Footer from "./components/partials/Footer.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/games' element={<Games />}/>
                <Route path='/nfos' element={<NFOS />}/>
                <Route path='/groups' element={<Groups />}/>
                <Route path='/protections' element={<Protections />}/>
                <Route path='/markets' element={<Markets />}/>
                <Route path='/free-keys' element={<FreeKeys />}/>
                <Route path='/get-karma' element={<GetKarma />}/>
                <Route path='/forum' element={<Forum />}/>
                <Route path='/messages' element={<Messages />} />
                <Route path='/login' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/terms-conditions' element={<Terms />} />
                <Route path='/frequency-questions' element={<FrequencyQuestions />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </React.StrictMode>,
)
