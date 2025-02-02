import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";


const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState((''));
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-jobs?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`);
      setJobs(data);


    }
    getData();


  }, [currentPage, filter, itemsPerPage, search, sort])

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs-count?filter=${filter}&search=${search}`);
      setCount(data.count);

    }
    getCount();
  }, [filter, search])

  console.log(count);
  // const pages = [1, 2, 3, 4, 5];
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  }

  const handleReset = () => {
    setFilter('');
    setSort('');
    setSearch('')
    setSearchText('')
  }

  const handleSearch = e => {
    e.preventDefault();
    // const text = e.target.search.value;
    setSearch(searchText);
  }
  console.log(search);


  return (
    <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          <div className="relative top-12 md:top-20 lg:top-0 -left-20 lg:-left-0 md:left-32">
            <select
              onChange={e => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              value={filter}
              name='category'
              id='category'
              className='border p-2 md:p-4 rounded-lg w-[140px] md:w-[188px] h-[40px] md:h-[54px] text-xs md:text-sm '
            >
              <option className="focus:bg-gray-600 " value=''>Filter By Category</option>
              <option className="focus:bg-gray-600" value='Web Development'>Web Development</option>
              <option className="focus:bg-gray-600" value='Graphics Design'>Graphics Design</option>
              <option className="focus:bg-gray-600" value='Digital Marketing'>Digital Marketing</option>
            </select>
          </div>

          <form
            onSubmit={handleSearch}
            className="min-w-[275px] md:min-w-[330px] text-sm md:text-base">
            <div className='relative -top-20 md:-top-0 flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-gray-400 focus-within:ring-gray-300 '>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button className='px-1 py-1 md:px-4 md:py-3 text-xs md:text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none '>
                Search
              </button>
            </div>
          </form>
          <div className="relative bottom-[78px] md:-bottom-20 lg:bottom-0 -right-20 md:right-32 lg:-right-0">
            <select
              onChange={e => {
                setSort(e.target.value)
                setCurrentPage(1)
              }}
              value={sort}
              name='Sort'
              id='Sort'
              className='border p-2 md:p-4 rounded-md w-[140px] md:w-[188px] h-[40px] md:h-[54px] text-xs md:text-sm'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button
            onClick={handleReset}
            className='btn btn-sm md:btn-md relative bottom-20 md:-bottom-20 lg:bottom-0 md:right-24 lg:right-0 text-xs md:text-sm'>Reset</button>
        </div>
        <div className='grid grid-cols-1 gap-8 -mt-12 md:mt-32 lg:mt-14 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      <div className='flex justify-center mt-12 text-sm md:text-base'>
        {/* Previous Button */}
        <button
          onClick={() => handlePaginationButton(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-2 md:px-4 py-1 md:py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-gray-600  hover:text-white'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>
        {/* Page Numbers */}
        {pages.map(btnNum => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`px-2 md:px-4 py-1 md:py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-gray-500 ${currentPage === btnNum ? 'bg-gray-600 text-white' : ''} hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          onClick={() => handlePaginationButton(currentPage + 1)}
          disabled={currentPage === numberOfPages}
          className='px-2 md:px-4 py-1 md:py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-gray-600 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

export default AllJobs