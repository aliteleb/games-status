import React, {useContext} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import NFOS from "./pages/NFOS.jsx";
import Navbar from "./partials/Navbar.jsx";
import Groups from "./pages/Groups.jsx";
import Protections from "./pages/Protections.jsx";
import Markets from "./pages/Markets.jsx";
import FreeKeys from "./pages/FreeKeys.jsx";
import GetKarma from "./pages/GetKarma.jsx";
import FrequencyQuestions from "./pages/FrequencyQuestions.jsx";
import Terms from "./pages/Terms.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Messages from "./pages/Messages.jsx";
import Forum from "./pages/Forum.jsx";
import Footer from "./partials/Footer.jsx";
import SearchGames from './pages/SearchGames';
import {Toaster} from "react-hot-toast";

export default function App()
{
    return (
        <BrowserRouter>
            <Navbar/>
            <Toaster containerStyle={{ top: 110 }} toastOptions={{
                // Define default options
                className: '',
                duration: 2000,
                style: {
                    background: '#101010',
                    color: '#ddd',
                    border: '1px solid #222',
                },
                success: {
                    iconTheme: {
                        primary: '#090',
                        secondary: 'black',
                    },
                },

                // Default options for specific types

            }
            }/>
            <div className="container my-10 text-gray-200 px-2 md:px-0">
                <Routes>
                    <Route path='/' element={<Home />}/>
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
                    <Route path='*' element={<PageNotFound />} />
                    <Route path='/search-game' element={<SearchGames />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}
