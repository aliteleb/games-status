import { useAuth } from "../components/api/AuthContext.jsx";

function isAuthenticated() {
    const { user } = useAuth();
    return !!user;
}

export function AuthMiddleware({ element }) {

    if (isAuthenticated())
        return element;
    else
        window.location = "/login"

}
