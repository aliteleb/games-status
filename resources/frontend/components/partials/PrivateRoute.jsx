import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute({ element, authenticated, redirectTo }) {
  return authenticated ? element : <Navigate to={redirectTo} replace />;
}
