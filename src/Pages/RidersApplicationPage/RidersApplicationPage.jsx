import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { FaTrashAlt, FaUserCheck, FaUserMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const RidersApplicationPage = () => {
    const axiosSecure = useAxiosSecure();

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending-application'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });

    const updateRiderStatus = (status, rider) => {
        const updateData = { status: status,email: rider.email };
        axiosSecure.patch(`/riders/${rider._id}`, updateData)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Accepted!",
                        text: `Rider has been ${status} successfully.`,
                        icon: "success"
                    });
                    refetch();
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    const handleApprove = (rider) => {
        // console.log(rider);
        updateRiderStatus('approved', rider);
    }

    const handleReject = (rider) => {
        updateRiderStatus('rejected', rider);
    }
    const handleDelete = (rider) => {
        console.log(rider);
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Rider Application Page ({riders.length})
            </h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className='text-center text-black'>#</th>
                            <th className='text-center text-black'>Name</th>
                            <th className='text-center text-black'>Email</th>
                            <th className='text-center text-black'>License No</th>
                            <th className='text-center text-black'>Application Status</th>
                            <th className='text-center text-black'>Work Status</th>
                            <th className='text-center text-black'>District</th>
                            <th className='text-center text-black'>Created At</th>
                            <th className='text-center text-black'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => (
                                <tr key={rider._id}>
                                    <td className='text-center text-black'>{index + 1}</td>
                                    <td className='text-center text-black'>{rider.name}</td>
                                    <td className='text-center text-black'>{rider.email}</td>
                                    <td className='text-center text-black'>{rider.license}</td>
                                    <td className='text-center text-black'>
                                        <span
                                            className={`badge 
                                             ${rider.status === 'pending' && 'bg-blue-500 text-white'}
                                             ${rider.status === 'approved' && 'bg-green-500 text-white'}
                                             ${rider.status === 'rejected' && 'bg-red-500 text-black'}
                                         `}
                                        >
                                            {rider.status}
                                        </span>

                                    </td>
                                    <td className={`badge ${rider.workStatus === 'available' ? 'bg-green-500 text-white' : 'bg-blue-400 text-black'} text-center`}>{rider.workStatus || 'Not Assigned'}</td>
                                    <td className='text-center text-black'>{rider.district}</td>
                                    <td className='text-center text-black'>
                                        {new Date(rider.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='flex gap-1 text-center text-black'>
                                        <button onClick={() => handleApprove(rider)} className='btn text-center text-black' ><FaUserCheck /></button>
                                        <button onClick={() => handleReject(rider)} className='btn text-center text-black ' ><FaUserMinus /></button>
                                        <button onClick={() => handleDelete(rider)} className='btn text-center  text-red-500' ><FaTrashAlt /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RidersApplicationPage;
