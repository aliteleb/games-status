import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import SearchGames from "./pages/SearchGames";
import Protection from "./pages/Protection";
import Group from "./pages/Group";
import Game from "./pages/Game";
import User from "./pages/User";
import Logout from "./pages/Logout";
import ScrollToTop from "./layouts/ScrollToTop";
import BlurredBackground from "./core/BlurredBackground.jsx";
import Profile from "./pages/Profile";
import { useAuth } from "./api/AuthContext.jsx";


export default function App() {

    const { user } = useAuth();

    window.ondragstart = () => false;

    React.useEffect(() => {
        const handleTabKeyPress = (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
            }
        };
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Attach the event listeners
        window.addEventListener("keydown", handleTabKeyPress);
        window.addEventListener("contextmenu", handleContextMenu);

        // Remove the event listeners
        return () => {
            window.removeEventListener("keydown", handleTabKeyPress);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);


    return (
        <BrowserRouter>
            <BlurredBackground />
            <ScrollToTop />
            <Navbar />
            <div className="container px-2 py-28 text-gray-200 m-[auto] xl:px-0">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/nfos" element={<NFOS />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/protections" element={<Protections />} />
                    <Route path="/markets" element={<Markets />} />
                    <Route path="/free-keys" element={<FreeKeys />} />
                    <Route path="/get-karma" element={<GetKarma />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms-conditions" element={<Terms />} />
                    <Route path="/frequency-questions" element={<FrequencyQuestions />} />
                    <Route path="/games" element={<SearchGames />} />
                    <Route path="/protection/:slug" element={<Protection />} />
                    <Route path="/group/:slug" element={<Group />} />
                    <Route path="/game/:slug" element={<Game />} />
                    <Route path="/user/:username" element={<User />} />
                    <Route path="/logout" element={<Logout />} />

                    {/* Auth*/}
                    <Route path="/profile" element={!user ? <Navigate to="/login" /> : <Profile />} />

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>

            <Footer />
        </BrowserRouter>
    );
}
