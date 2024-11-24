import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabCategories = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
            setJobs(data);
        }
        getData();
    }, [])
    return (
        <div>
            <Tabs>
                <div className='container mx-auto px-4 md:px-5 mt-5 md:mt-6 xl:mt-8'>
                    <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
                        Browse Jobs By Categories
                    </h1>

                    <p className='max-w-2xl mx-auto my-4 md:my-6 text-center text-gray-500 text-[13px] md:text-base '>
                        Three categories available for the time being. They are Web
                        Development, Graphics Design and Digital Marketing. Browse them by
                        clicking on the tabs below.
                    </p>
                    <div className="flex  items-center justify-center">
                        <div className='hidden md:block'>
                            <TabList >
                                <Tab>Web Development</Tab>
                                <Tab>Graphics Design</Tab>
                                <Tab>Digital Marketing</Tab>
                            </TabList>
                        </div>
                        <div className='block md:hidden text-sm'>
                            <TabList >
                                <Tab>Web</Tab>
                                <Tab>Graphics</Tab>
                                <Tab>Digital</Tab>
                            </TabList>
                        </div>

                    </div>

                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6 md:mt-8 xl:mt-12'>
                            {
                                jobs
                                    .filter(j => j.category === 'Web Development')
                                    .map(job => <JobCard key={job._id}
                                        job={job}
                                    ></JobCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6 md:mt-8 xl:mt-12'>
                            {
                                jobs
                                    .filter(j => j.category === 'Graphics Design')
                                    .map(job => <JobCard key={job._id}
                                        job={job}
                                    ></JobCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6 md:mt-8 xl:mt-12'>
                            {
                                jobs
                                    .filter(j => j.category === 'Digital Marketing')
                                    .map(job => <JobCard key={job._id}
                                        job={job}
                                    ></JobCard>)
                            }
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TabCategories;