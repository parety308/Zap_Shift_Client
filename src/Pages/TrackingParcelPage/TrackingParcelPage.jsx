import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const TrackingParcelPage = () => {
    const { trackingId } = useParams();
    const axios = useAxios();

    const [statusTextMap, setStatusTextMap] = useState({});


    useEffect(() => {
        fetch('/trackingStatus.json')
            .then((res) => res.json())
            .then((data) => setStatusTextMap(data))
            .catch((err) => console.error('Failed to load tracking status JSON', err));
    }, []);

    const { data: trackings = [], isLoading, isError } = useQuery({
        queryKey: ['trackings', trackingId],
        enabled: !!trackingId,
        queryFn: async () => {
            const res = await axios.get(`/trackings/${trackingId}/logs`);
            return res.data; 
        },
    });

    if (isLoading) {
        return <div className="text-center my-20">Loading tracking information...</div>;
    }

    if (isError || !trackings.length) {
        return (
            <div className="text-center my-20 text-red-500">
                No tracking information found.
            </div>
        );
    }

    return (
        <div className="w-10/12 mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">
                Parcel Tracking ID: {trackingId}
            </h1>

            <ul className="timeline timeline-vertical">
                {trackings.map((tracking) => (
                    <li key={tracking._id}>
                        <hr />

                        {/* Date */}
                        <div className="timeline-start text-sm text-gray-500">
                            {new Date(tracking.createdAt).toLocaleDateString('en-GB')}
                        </div>

                        {/* Icon */}
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5 text-primary"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>

                        {/* Status text from JSON */}
                        <div className="timeline-end timeline-box w-64 hover:translate-x-5 hover:bg-primary transition-all duration-300">
                            <h3 className="text-lg font-semibold">
                                {statusTextMap[tracking.status]?.title || 'Status Update'}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {statusTextMap[tracking.status]?.message || tracking.details}
                            </p>
                        </div>

                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackingParcelPage;
