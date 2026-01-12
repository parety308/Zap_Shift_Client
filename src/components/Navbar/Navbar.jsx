import React from 'react';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useAuth();
    // console.log("user from navbar", user);
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/send-percel'>Send Percel</NavLink></li>
        <li><NavLink to='/coverage'>Coverage Areas</NavLink></li>
        <li><NavLink to='/be-rider'>Be a Rider</NavLink></li>

        {
            user && <li><NavLink to='/dashboard'>DashBoard</NavLink></li>
        }
        <li><NavLink to='/about-us'>About Us</NavLink></li>
    </>
    const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Log Out Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        })
            .catch(err => console.log(err));
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}

                    </ul>
                </div>
                <NavLink to='/' className="btn btn-ghost text-xl"><Logo /></NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            {
                user ? <div className="navbar-end flex gap-4">
                    <img className='w-10 h-10 rounded-full' src={user?.photoURL} alt="" />
                    <NavLink onClick={handleLogOut} className="btn bg-lime-300">Sign Out</NavLink>
                </div>
                    : (<div className="navbar-end flex gap-4">
                        <NavLink to='/auth/login' className="btn bg-lime-300">Login</NavLink>
                        <NavLink to='/auth/signup' className="btn bg-lime-300">Sign Up</NavLink></div>)
            }
        </div>
    );
};

export default Navbar;