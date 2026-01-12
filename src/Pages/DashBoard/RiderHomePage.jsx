import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import useAuth from '../../hooks/useAuth/useAuth';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import RiderLoading from '../../components/RiderLoading/RiderLoading';

const RiderHomePage = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: deliveryStat = [] } = useQuery({
        enabled: !!user?.email,
        queryKey: ['delivery-per-day', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/delivery-per-day?email=${user.email}`
            );
            return res.data;
        }
    });

    const chartData = deliveryStat.map(item => ({
        name: item.date,
        value: item.totalDelivered
    }));

    if (loading) {
        return <RiderLoading />
    }
    return (
        <div className='w-10/12 mx-auto'>
            <h1 className="text-3xl">Rider Dashboard</h1>
            <h1 className="text-2xl font-semibold my-10 mb-3">Daily Delivered</h1>
            <div style={{ width: '50%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RiderHomePage;
