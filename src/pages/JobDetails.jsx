
import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
const JobDetails = () => {
    const [startDate, setStartDate] = useState(new Date());
    const job = useLoaderData();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { job_title, deadline, category, min_price, max_price, description, _id, buyer } = job || {};


    const handlePlaceBid = async e => {
        e.preventDefault();
        if (user?.email === buyer?.email) return toast.error('Action not permitted!');
        const form = e.target;
        const jobId = _id;
        const price = parseFloat(form.price.value);
        if (price < parseFloat(min_price)) return toast.error('Offer More or at least equal to Minimum Price');
        if (price > parseFloat(max_price)) return toast.error('Offer less or at least equal to Maximum Price');
        const email = form.email.value;
        const comment = form.comment.value;
        const deadline = startDate;
        const status = 'Pending';

        const bidData = {
            jobId,
            job_title,
            price,
            deadline,
            comment,
            category,
            email,
            photo: user?.photoURL,
            status,
            buyer

        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/bid`, bidData);
            console.log(data);
            toast.success('Bid Placed Successfully!');
            navigate('/my-bids');
        }
        catch (err) {
            toast.error(err?.code)
        }
    }


    return (
        <div className='flex flex-col lg:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] lg:max-w-screen-xl xl:mx-auto lg:mx-4 md:mx-20 mx-4 mb-12 md:mb-16 lg:mb-24 md:mt-6 mt-2 lg:mt-8 2xl:mt-0'>
            {/* Job Details */}
            <div className='flex-1 w-full mb-2 lg:mb-0 px-3 md:px-6 lg:px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-light text-gray-800 '>
                        Deadline: {new Date(deadline).toLocaleDateString()}
                    </span>
                    <span className='px-4 py-1 text-xs text-gray-800 uppercase bg-gray-200 rounded-full '>
                        {category}
                    </span>
                </div>

                <div>
                    <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
                        {job_title}
                    </h1>

                    <p className='mt-2 text-lg text-gray-600 '>
                        {description}
                    </p>
                    <p className='mt-6 text-sm font-bold text-gray-600 '>
                        Buyer Details:
                    </p>
                    <div className='flex items-center gap-5'>
                        <div>
                            <p className='mt-2 text-sm  text-gray-600 '>Name: {buyer?.name}</p>
                            <p className='mt-2 text-sm  text-gray-600 '>
                                Email: {buyer?.email}
                            </p>
                        </div>
                        <div className=''>
                            <img className="rounded-full w-14 h-14 object-cover" src={buyer?.photo} alt='' />
                        </div>
                    </div>
                    <p className='mt-6 text-lg font-bold text-gray-600 '>
                        Range: ${min_price} - ${max_price}
                    </p>
                </div>
            </div>
            {/* Place A Bid Form */}
            <section className='p-4 md:p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
                <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                    Place A Bid
                </h2>

                <form onSubmit={handlePlaceBid}>
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                        <div>
                            <label className='text-gray-700 ' htmlFor='price'>
                                Price
                            </label>
                            <input
                                id='price'
                                type='text'
                                name='price'
                                required
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 ' htmlFor='emailAddress'>
                                Email Address
                            </label>
                            <input
                                id='emailAddress'
                                type='email'
                                name='email'
                                disabled
                                defaultValue={user?.email}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 ' htmlFor='comment'>
                                Comment
                            </label>
                            <input
                                id='comment'
                                name='comment'
                                type='text'
                                required
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700'>Deadline</label>

                            {/* Date Picker Input Field */}
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                className="p-2 w-full px-4 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring "
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6'>
                        <button
                            type='submit'
                            className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
                        >
                            Place Bid
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default JobDetails;