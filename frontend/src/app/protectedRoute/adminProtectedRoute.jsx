import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../404/404';

const AdminProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/v1/admin/auth",
                    { withCredentials: true }
                );
                setIsAuthenticated(response.data.isAuthenticated);
                console.log(response)
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }


    console.log("test", isAuthenticated)

    if (isAuthenticated) {
        return children;
    }
    else {
        return <NotFound />;
    }

};

export default AdminProtectedRoute;
