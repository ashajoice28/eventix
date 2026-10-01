import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute({
  roles,
}) {

  const {
    user,
    loading,
  } = useAuth();


  const location =
    useLocation();


  if (loading) {

    return (

      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          color: "#d4af37",
        }}
      >
        Loading Eventix...
      </div>

    );

  }


  /* NOT LOGGED IN */

  if (!user) {

    return (

      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />

    );

  }


  /* WRONG ROLE */

  if (
    roles &&
    !roles.includes(user.role)
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  return <Outlet />;

}