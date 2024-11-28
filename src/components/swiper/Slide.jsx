import { Link } from "react-router-dom"

const Slide = ({image, text}) => {
    return (
        <div
            className='w-full  bg-center bg-cover h-[15rem] md:h-[25rem] lg:h-[30rem] xl:h-[35rem] 2xl:h-[38rem] '
            style={{
                backgroundImage: `url(${image})`,
                
            }}
        >
            <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                <div className='text-center'>
                    <h1 className='text-xl md:text-2xl px-6 md:px-0 font-semibold text-white lg:text-4xl md:mb-3'>
                       {text}
                    </h1>
                    <br />
                    <Link to='/add-job' className=' px-3 md:px-5 py-2 md:py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'>
                        Post Job & Hire Expert
                    </Link>
                </div>
            </div>  
        </div>
    )
}

export default Slide