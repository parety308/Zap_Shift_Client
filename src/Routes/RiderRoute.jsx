import React from 'react';
import useAuth from '../hooks/useAuth/useAuth';
import useRole from '../hooks/useRole/useRole';
import Loading from '../components/Loading/Loading';

const RiderRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, isLoading } = useRole();
    if (loading || isLoading) {
        return <Loading />;
    }
    if (role !== 'rider') {
        return <Forbidden />;
    }
    return children;
};

export default RiderRoute;