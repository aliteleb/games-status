import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./components/App.jsx";
import {AuthProvider} from "./components/api/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
)
