import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateJob = () => {
    const job = useLoaderData();
    const { user } = useContext(AuthContext);
    const { job_title, deadline, category, min_price, max_price, description, _id } = job || {};
    const [startDate, setStartDate] = useState(deadline ? new Date(deadline) : new Date());
    const navigate = useNavigate();

    const handleUpdatePost = async e => {
        e.preventDefault();
        const form = e.target;
        const job_title = form.job_title.value;
        const deadline = startDate;
        const category = form.category.value;
        const min_price = parseFloat(form.min_price.value);
        const max_price = parseFloat(form.max_price.value);
        const description = form.description.value;

        const updateData = {
            job_title,
            deadline,
            category,
            min_price,
            max_price,
            description
        }

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/job/${_id}`, updateData);
            toast.success('Update Successfully!');
            navigate('/my-posted-jobs')
        }
        catch (err) {
            toast.error(err?.code);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-4 md:my-12 pb-6'>
            <section className='mx-4 md:mx-[18%] lg:mx-[22%] xl:mx-[30%] 2xl:mx-[35%] w-full p-4 md:p-6 bg-white rounded-md shadow-md '>
                <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                    Update a Job
                </h2>

                <form onSubmit={handleUpdatePost}>
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                        <div>
                            <label className='text-gray-700 ' htmlFor='job_title'>
                                Job Title
                            </label>
                            <input
                                id='job_title'
                                name='job_title'
                                type='text'
                                defaultValue={job_title}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
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
                                defaultValue={user?.email}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700'>Deadline</label>

                            {/* Date picker input field */}
                            <DatePicker

                                selected={startDate} onChange={(date) => setStartDate(date)}
                                className="p-2 w-full px-4 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring "
                            />
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700 ' htmlFor='category'>
                                Category
                            </label>
                            <select
                                name='category'
                                id='category'
                                defaultValue={category}
                                className='border p-2 rounded-md'
                            >
                                <option value='Web Development'>Web Development</option>
                                <option value='Graphics Design'>Graphics Design</option>
                                <option value='Digital Marketing'>Digital Marketing</option>
                            </select>
                        </div>
                        <div>
                            <label className='text-gray-700 ' htmlFor='min_price'>
                                Minimum Price
                            </label>
                            <input
                                id='min_price'
                                name='min_price'
                                type='number'
                                defaultValue={min_price}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 ' htmlFor='max_price'>
                                Maximum Price
                            </label>
                            <input
                                id='max_price'
                                name='max_price'
                                type='number'
                                defaultValue={max_price}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-gray-700 ' htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            name='description'
                            id='description'
                            defaultValue={description}
                            cols='30'
                        ></textarea>
                    </div>
                    <div  className='flex justify-end mt-6'>
                        <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                            Update
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default UpdateJob