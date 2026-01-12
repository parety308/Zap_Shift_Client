import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import rideImg from '../../assets/agent-pending.png';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const BeRider = () => {
    const serviceCenters = useLoaderData();
    // console.log(serviceCenters);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const duplicateServiceCenters = serviceCenters.map(c => c.region);
    const UniqueServiceCenters = [...new Set(duplicateServiceCenters)];
    const regions = useWatch({ control, name: 'region' });
    const districtsByRegion = region => {
        const regionDistricts = serviceCenters.filter(s => s.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }
    const onSubmit = (data) => {
        // console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Submitted!",
                        text: "Your Request  has been taken,We will contact with you.",
                        icon: "success"
                    });
                }
            });
    };

    return (
        <div className="w-11/12 mx-auto my-10">
            {/* Header */}
            <div className="w-1/2 mb-8">
                <h1 className="text-4xl font-bold my-5">Be a Rider</h1>
                <p>
                    Enjoy fast, reliable parcel delivery with real-time tracking
                    and zero hassle. From personal packages to business shipments —
                    we deliver on time, every time.
                </p>
            </div>

            {/* Form & Image */}
            <div className="lg:flex md:flex  lg:justify-between md:justify-between">
                {/* Form */}
                <form
                    className="w-full lg:w-1/2 md:w-1/2 bg-base-100 shadow-sm p-4 rounded-xl"
                    onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold my-4">
                        Tell Us About Yourself
                    </h1>

                    {/* Name */}
                    <div className="my-2">
                        <label className="label font-semibold">Your Name</label>
                        <input
                            {...register('name', { required: true })}
                            defaultValue={user.displayName}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                    </div>

                    {/* Driving License */}
                    <div className="my-2">
                        <label className="label font-semibold">Driving License Number</label>
                        <input
                            type="text"
                            {...register('license', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Your Driving License"
                        />
                    </div>

                    {/* Email */}
                    <div className="my-2">
                        <label className="label font-semibold">Your Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            defaultValue={user?.email}
                            className="input input-bordered w-full"
                            placeholder="Your Email"
                        />
                    </div>

                    {/* Region */}
                    <div className="my-2">
                        <label className="label font-semibold">Your Region</label><br />
                        <select defaultValue="Select a region"
                            className="select w-full"
                            {...register('region', { required: true })}>
                            <option disabled={true}>Select a region</option>
                            {
                                UniqueServiceCenters.map((region, index) => (
                                    <option key={index} value={region}>{region}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* District */}
                    <div className="my-2">
                        <label className="label font-semibold">Your District</label><br />
                        <select defaultValue="Select a district"
                            className="select w-full"
                            {...register('district', { required: true })}>
                            <option disabled={true}>Select a district</option>
                            {
                                districtsByRegion(regions)?.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                )
                                )
                            }
                        </select>
                    </div>

                    {/* NID */}
                    <div className="my-2">
                        <label className="label font-semibold">NID No</label>
                        <input
                            {...register('nid', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="NID Number"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="my-2">
                        <label className="label font-semibold">Phone Number</label>
                        <input
                            {...register('phone', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Your Phone Number"
                        />
                    </div>

                    {/* Bike Brand Model and Year */}
                    <div className="my-2">
                        <label className="label font-semibold">Bike Brand Model and Year</label>
                        <input
                            {...register('bike-brand', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Bike Brand, Model and Year"
                        />
                    </div>
                    {/* Bike Registration Number */}
                    <div className="my-2">
                        <label className="label font-semibold">Bike Registration Number</label>
                        <input
                            {...register('bike-registration', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Bike Registration Number"
                        />
                    </div>

                    {/* About You */}
                    <div className="my-2">
                        <label className="label font-semibold">About Yourself</label>
                        <textarea
                            {...register('about-you', { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Tell us about yourself"
                        />
                    </div>

                    {/* Submit */}
                    <button className="btn btn-success w-full mt-5">
                        Submit
                    </button>
                </form>

                {/* Image */}
                <div>
                    <img src={rideImg} alt="Rider" />
                </div>
            </div>
        </div>
    );
};

export default BeRider;
