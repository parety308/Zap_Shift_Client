import React from 'react';
import useAuth from '../hooks/useAuth/useAuth';
import Loading from '../components/Loading/Loading';
import useRole from '../hooks/useRole/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useRole();


    if (loading || isLoading) {
        return <Loading />;
    }

    if (role !== 'admin') {
        return <Forbidden />;
    }
    return children;
};

export default AdminRoute;