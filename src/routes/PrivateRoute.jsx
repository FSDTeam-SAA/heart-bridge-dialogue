import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useEffect, useState } from "react";

const PrivateRoute = ({children}) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    if(loading) return <div className="min-h-screen flex flex-col justify-center items-center"><h1 className="text-3xl font-bold text-pink-500">Loading...</h1></div>
    
    if(user) {
        return children
    } else {
        return <Navigate to='/login' state={location.pathname} replace={true}></Navigate>
    }
}

PrivateRoute.propTypes = {
    children: PropTypes.element,
}

export default PrivateRoute
