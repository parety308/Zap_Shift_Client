import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';

const MyPayments = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = axiosSecure.get(`/parcels/${id}`);
            return (await res).data;
        }
    })
    if (isLoading) {
        return <div><span className="loading loading-ring loading-3xl text-green-600"></span></div>
    }

    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    }
    return (
        <div>
            <h1 className="text-2xl text-center">Please pay <strong>{parcel.cost}</strong> tk for <strong>{parcel.parcelName}</strong></h1>
            <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default MyPayments;