import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useEffect, useState } from "react";

const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmailVerified(currentUser.emailVerified);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-blue-500">Loading...</h1>
      </div>
    );

  if (user) {
    if (emailVerified) {
      return <Navigate to="/" replace />;
    } else {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-xl text-red-500">
            Please verify your email address before logging in.
          </h1>
        </div>
      );
    }
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PublicRoute;
