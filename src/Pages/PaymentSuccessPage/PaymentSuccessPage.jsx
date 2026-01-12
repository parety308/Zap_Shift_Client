import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useEffect, useState } from "react";

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    });
                    // console.log(res.data);
                });
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                
                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-green-600 mb-2">
                    Payment Successful 🎉
                </h1>

                <p className="text-gray-600 mb-6">
                    Thank you! Your payment has been processed successfully.
                </p>

                {/* Info Box */}
                <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
                    <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-semibold break-all">
                            {paymentInfo.transactionId || "Loading..."}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Tracking ID</p>
                        <p className="font-semibold break-all">
                            {paymentInfo.trackingId || "Loading..."}
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                    <Link
                        to="/dashboard"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Go Dashboard
                    </Link>

                    <Link
                        to="/"
                        className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg font-semibold transition"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
