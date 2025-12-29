import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import HomePage from "../Pages/HomePage/HomePage";
import CoveragePage from "../Pages/CoveragePage/CoveragePage";
import AuthLayout from "../Pages/AuthLayout/AuthLayout";
import Login from "../Pages/AuthLayout/Login/Login";
import SignUp from "../Pages/AuthLayout/SignUP/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import SendPercelPage from "../Pages/SendPercelPage/SendPercelPage";
import BeRider from "../Pages/BeRider/BeRider";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Myparcels from "../Pages/MyParcels/Myparcels";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import MyPayments from "../Pages/MyPayments/MyPayments";
import PaymentSuccessPage from "../Pages/PaymentSuccessPage/PaymentSuccessPage";
import PaymentCancelledPage from "../Pages/PaymentCancelledPage/PaymentCancelledPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage,
                loader: () => fetch('services.json').then(res => res.json())
            },
            {
                path: "/coverage",
                Component: CoveragePage,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())
            },
            {
                path: '/send-percel',
                element: <PrivateRoutes><SendPercelPage /></PrivateRoutes>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())
            },
            {
                path: '/be-rider',
                element: <PrivateRoutes><BeRider /></PrivateRoutes>
            }

        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: '/auth/login',
                Component: Login
            },
            {
                path: '/auth/signup',
                Component: SignUp
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashBoard /></PrivateRoutes>,
        children: [
            {
                path: 'my-parcels',
                Component: Myparcels
            },
            {
                path: 'my-payments/:id',
                Component: MyPayments
            },
            {
                path: 'payment-success',
                Component: PaymentSuccessPage
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelledPage
            }
        ]
    }
]);