import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const { data: parcels, isLoading ,refetch:parcelRefetch} = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    });

    const { data: availableRiders = [], refetch:riderRefetch } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?workStatus=available&district=${selectedParcel.senderDistrict}`);
            return res.data;
        }
    })

    const openRiderModal = (parcel) => {
        setSelectedParcel(parcel);
        riderModalRef.current.showModal();
    }

    const assignRider = (rider) => {
        const assignData = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id,
            trackingId:selectedParcel.trackingId
        };
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, assignData)
            .then(res => {
                riderModalRef.current.close();
                riderRefetch();
                parcelRefetch();
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: `Rider ${rider.name} has been assigned successfully.`,
                        icon: "success"
                    });
                }
            });
        

    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className="text-4xl font-bold">Assign Riders :{parcels?.length}</h1>
            <div className="overflow-x-auto mt-6">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="text-center text-black">#</th>
                            <th className="text-center text-black">Parcel Name</th>
                            <th className="text-center text-black">Sender Email</th>
                            <th className="text-center text-black">Cost </th>
                            <th className="text-center text-black">Created At</th>
                            <th className="text-center text-black">Pickup District</th>
                            <th className="text-center text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map((parcel, index) => (
                                <tr key={parcel._id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{parcel.parcelName}</td>
                                    <td className="text-center">{parcel.senderEmail}</td>
                                    <td className="text-center">{parcel.cost}</td>
                                    <td className="text-center">{new Date(parcel.createdAt).toLocaleDateString()}</td>
                                    <td className="text-center">{parcel.senderDistrict}</td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => openRiderModal(parcel)}
                                            className="btn btn-sm btn-primary text-black">Find Riders</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">{availableRiders.length}</p>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <tbody>
                                {
                                    availableRiders.map((rider, index) => (
                                        <tr key={rider._id}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{rider.name}</td>
                                            <td className="text-center">{rider.license}</td>
                                            <td className="text-center">{rider.district}</td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => assignRider(rider)}
                                                    className="btn btn-sm btn-primary text-black">Assign</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;