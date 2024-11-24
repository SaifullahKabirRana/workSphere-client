import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';

const TabCategories = () => {
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
                        <h2 className='mt-2'><JobCard></JobCard></h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 3</h2>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TabCategories;