
const JobCard = ({job}) => {
    const {job_title, deadline, category, min_price, max_price, description} = job;
    return (
        <div className="">
            <div className='w-full min-h-[170px] lg:min-h-[205px] xl:min-h-[180px] max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'>
                <div className='flex items-center justify-between'>
                    <span className='text-xs font-light text-gray-800 '>
                        {deadline}
                    </span>
                    <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
                        {category}
                    </span>
                </div>

                <div>
                    <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
                        {job_title}
                    </h1>

                    <p className='mt-2 text-sm text-gray-600 '>
                        {description}
                    </p>
                    <p className='mt-2 text-sm font-bold text-gray-600 '>
                        Range: ${min_price} - ${max_price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobCard;