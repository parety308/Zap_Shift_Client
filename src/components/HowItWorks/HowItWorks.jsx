import bookingIcon from '../../assets/bookingIcon.png';
const HowItWorks = () => {
    return (
        <div className='my-10 w-10/12 mx-auto'>
            <h1 className="text-4xl font-bold">How it Works</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 my-8">
                <div className="border p-4 rounded-lg shadow-sm bg-[#FFFFFF] flex flex-col  justify-center items-center gap-2  hover:-translate-y-2 hover:bg-amber-200">
                    <img src={bookingIcon} alt="" />
                    <h3 className='text-2xl font-semibold'>Booking Pick & Drop</h3>
                    <p className='text-lg'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>

                <div className="border p-4 rounded-lg shadow-sm bg-[#FFFFFF] flex flex-col  justify-center items-center gap-2  hover:-translate-y-2 hover:bg-amber-200">
                    <img src={bookingIcon} alt="" />
                    <h3 className='text-2xl font-semibold'>Cash on Delivery </h3>
                    <p className='text-lg'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>

                <div className="border p-4 rounded-lg shadow-sm bg-[#FFFFFF] flex flex-col  justify-center items-center gap-2  hover:-translate-y-2 hover:bg-amber-200">
                    <img src={bookingIcon} alt="" />
                    <h3 className='text-2xl font-semibold'>Delivery Hub</h3>
                    <p className='text-lg'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>

                <div className="border p-4 rounded-lg shadow-sm bg-[#FFFFFF] flex flex-col  justify-center items-center gap-2  hover:-translate-y-2 hover:bg-amber-200">
                    <img src={bookingIcon} alt="" />
                    <h3 className='text-2xl font-semibold'>Booking SME & Corporate</h3>
                    <p className='text-lg'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;