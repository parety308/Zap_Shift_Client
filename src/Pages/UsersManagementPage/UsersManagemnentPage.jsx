import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const UsersManagemnentPage = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    useEffect(() => {
        setSearchResults(users);
    }, [users]);

    // Change role
    const handleChangeRole = (id, role) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to make this user ${role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change role!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/${id}`, { role });
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: "User role has been updated.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    };


    // Delete user
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    };

    //search handler
    const handleSearch = async (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const searchUser = users.filter(user => user.displayName.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(searchUser);
    };
    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">
                Manage Users ({searchResults.length})
            </h1>
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    onChange={handleSearch}
                    type="search"
                    className="grow"
                    placeholder="Search Users" />
            </label>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className='text-center text-black'>#</th>
                            <th className='text-center text-black'>Photo</th>
                            <th className='text-center text-black'>Name</th>
                            <th className='text-center text-black'>Email</th>
                            <th className='text-center text-black'>Role</th>
                            <th className='text-center text-black'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchResults.map((user, index) => (
                            <tr key={user._id}>
                                <td className='text-center text-black'>{index + 1}</td>

                                <td className='text-center text-black'>
                                    <img
                                        src={user.photoURL}
                                        className="w-10 h-10 rounded-full"
                                        alt=""
                                    />
                                </td>

                                <td className='text-center text-black'>{user.displayName}</td>
                                <td className='text-center text-black'>{user.email}</td>

                                {/*  Role Badge */}
                                <td className='text-center text-black'>
                                    <span className={`badge 
                                        ${user.role === 'admin' && 'badge-success'}
                                        ${user.role === 'rider' && 'badge-info'}
                                        ${user.role === 'user' && 'badge-warning'}
                                    `}>
                                        {user.role}
                                    </span>
                                </td>

                                {/*  Actions */}
                                <td className="space-x-2 text-center text-black">
                                    {/* admin control */}
                                    {user.role !== 'admin' ? (
                                        // Make admin
                                        <button
                                            onClick={() => handleChangeRole(user._id, 'admin')}
                                            className="btn btn-xs btn-success m-1 py-4"
                                        >
                                            Make Admin
                                        </button>) :
                                        // Remove from admin
                                        <button
                                            onClick={() => handleChangeRole(user._id, 'user')}
                                            className="btn btn-xs btn-warning m-1 py-4"
                                        >
                                            Remove Admin
                                        </button>
                                    }
                                    {/*  rider control */}
                                    {user.role !== 'rider' ? (
                                        // Make rider
                                        <button
                                            onClick={() => handleChangeRole(user._id, 'rider')}
                                            className="btn btn-xs btn-info m-1 py-4"
                                        >
                                            Make Rider
                                        </button>) : (
                                        // Remove from rider
                                        <button
                                            onClick={() => handleChangeRole(user._id, 'user')}
                                            className="btn btn-xs btn-warning m-1 py-4"
                                        >
                                            Remove Rider
                                        </button>
                                    )}
                                    {/* delete user */}
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-xs btn-error m-1"
                                    >
                                        Delete
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

export default UsersManagemnentPage;
