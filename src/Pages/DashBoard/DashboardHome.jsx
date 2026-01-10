import React from 'react';
import useRole from '../../hooks/useRole/useRole';
import AdminHomePage from './AdminHomePage';
import RiderHomePage from './RiderHomePage';
import UserHomePage from './UserHomePage';
import Loading from '../../components/Loading/Loading';
const DashboardHome = () => {
    const { role, isLoading } = useRole();
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            {
                role === 'admin' ? <AdminHomePage /> : role === 'rider' ? <RiderHomePage /> : <UserHomePage />
            }
        </div>
    );
};

export default DashboardHome;