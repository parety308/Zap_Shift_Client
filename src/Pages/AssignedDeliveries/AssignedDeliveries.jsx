import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'driver-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/riders?riderEmail=${user.email}&deliveryStatus=driver-assigned`
            );
            return res.data;
        }
    });

    const handleAccept = (parcel, action) => {
        axiosSecure
            .patch(`/parcels/${parcel._id}/status`, {
                deliveryStatus: action,
                riderId: parcel.riderId,
                trackingId:parcel.trackingId
            })
            .then(res => { 
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Parcel ${action} successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };

    const handleReject = (parcel) => {
        // intentionally empty (as requested)
    };

    return (
        <div>
            <h1 className="text-center text-4xl font-bold mb-6">
                Assigned Deliveries : {parcels.length}
            </h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="text-center text-black">#</th>
                            <th className="text-center text-black">Parcel Name</th>
                            <th className="text-center text-black">Sender District</th>
                            <th className="text-center text-black">Receiver District</th>
                            <th className="text-center text-black">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{parcel.parcelName}</td>
                                <td className="text-center">{parcel.senderDistrict}</td>
                                <td className="text-center">{parcel.receiverDistrict}</td>

                                <td className="text-center">

                                    {parcel.deliveryStatus === 'driver-assigned' && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleAccept(parcel, 'rider_arriving')
                                                }
                                                className="btn btn-primary mr-1 my-1 text-black"
                                            >
                                                Accept
                                            </button>

                                            <button
                                                onClick={() => handleReject(parcel)}
                                                className="btn bg-red-500 text-black my-1"
                                            >
                                                Decline
                                            </button>
                                        </>
                                    )}

                                    {parcel.deliveryStatus === 'rider_arriving' && (
                                        <button
                                            onClick={() =>
                                                handleAccept(parcel, 'out-for-delivery')
                                            }
                                            className="btn btn-primary my-1 text-black"
                                        >
                                            Mark as Pickup
                                        </button>
                                    )}

                                    {parcel.deliveryStatus === 'out-for-delivery' && (
                                        <button
                                            onClick={() =>
                                                handleAccept(parcel, 'delivered')
                                            }
                                            className="btn bg-blue-400 my-1 text-black"
                                        >
                                            Mark as Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;
