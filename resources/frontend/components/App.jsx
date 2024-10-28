import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./partials/Navbar.jsx";
import Footer from "./partials/Footer.jsx";
import ScrollToTop from "./layouts/ScrollToTop";
import BlurredBackground from "./core/BlurredBackground.jsx";
import { useAuth } from "./api/AuthContext.jsx";
import LazyLoader from "./partials/LazyLoader.jsx";

// Lazy load page components
const Home = lazy(() => import("./pages/Home.jsx"));
const Groups = lazy(() => import("./pages/Groups.jsx"));
const Protections = lazy(() => import("./pages/Protections.jsx"));
const Markets = lazy(() => import("./pages/Markets.jsx"));
const FreeKeys = lazy(() => import("./pages/FreeKeys.jsx"));
const FrequencyQuestions = lazy(() => import("./pages/FrequencyQuestions.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Messages = lazy(() => import("./pages/Messages.jsx"));
const Forum = lazy(() => import("./pages/Forum.jsx"));
const SearchGames = lazy(() => import("./pages/SearchGames"));
const Protection = lazy(() => import("./pages/Protection"));
const Group = lazy(() => import("./pages/Group"));
const Game = lazy(() => import("./pages/Game"));
const User = lazy(() => import("./pages/User"));
const Logout = lazy(() => import("./pages/Logout"));
const Profile = lazy(() => import("./pages/Profile"));

export default function App() {
    const { user } = useAuth();

    window.ondragstart = () => false;

    React.useEffect(() => {
        const handleTabKeyPress = (e) => {
            if (e.key === "Tab") {
                // e.preventDefault();
            }
        };
        const handleContextMenu = (e) => {
            // e.preventDefault();
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
            <Suspense fallback={<LazyLoader/>}>
                <BlurredBackground />
                <ScrollToTop />
                <Navbar />
                <div className="container px-2 py-28 text-gray-200 m-[auto] xl:px-0">

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                        <Route path="/groups" element={<Groups />} />
                        <Route path="/protections" element={<Protections />} />
                        <Route path="/markets" element={<Markets />} />
                        <Route path="/free-keys" element={<FreeKeys />} />
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

                        {/* Auth */}
                        <Route path="/profile" element={window?.appData.auth?.user ? <Profile /> : <Navigate to="/login" />} />

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
                <Footer />
            </Suspense>
        </BrowserRouter>
    );
}
