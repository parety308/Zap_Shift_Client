import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompleteDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user?.email, 'delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/riders?riderEmail=${user.email}&deliveryStatus=delivered`
            );
            return res.data;
        }
    });
    const calculatePayout = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8;
        }
        else {
            return parcel.cost * 0.6;
        }
    }
    return (
        <div>
            <h1 className="text-4xl font-bold">Completed Task : {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="text-center text-black">#</th>
                            <th className="text-center text-black">Parcel Name</th>
                            <th className="text-center text-black">Sender District</th>
                            <th className="text-center text-black">Receiver District</th>
                            <th className="text-center text-black">Cost</th>
                            <th className="text-center text-black">Payout</th>
                            <th className="text-center text-black">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{parcel.parcelName}</td>
                                <td className="text-center">{parcel.senderDistrict}</td>
                                <td className="text-center">{parcel.receiverDistrict}</td>
                                <td className="text-center">{parcel.cost}</td>
                                <td className="text-center">{calculatePayout(parcel)}</td>
                                <td className="text-center">
                                    <button
                                       
                                        className="btn btn-primary mr-1 my-1 text-black"
                                    >
                                        Cashout
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompleteDeliveries;