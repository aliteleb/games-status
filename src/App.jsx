import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/partials/Navbar.jsx";
import Home from './components/pages/Home';
import Games from './components/pages/Games'
import Groups from './components/pages/Groups'
import NFOS from './components/pages/NFOS'
import Protections from './components/pages/Protections'
import Markets from './components/pages/Markets'
import FreeKeys from './components/pages/FreeKeys'
import GetKarma from './components/pages/GetKarma'
import Forum from './components/pages/Forum'
import Messages from './components/pages/Messages'
import Login from './components/pages/Login'
import Footer from './components/partials/Footer';
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Terms from './components/pages/Terms'
import FrequencyQuestions from './components/pages/FrequencyQuestions'
import SignUp from './components/pages/SignUp';
import Auth from './components/Auth/Auth';


function App() {

  return (
    <BrowserRouter>
      <Auth>
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
      </Auth>
    </BrowserRouter>
  )
}

export default App
