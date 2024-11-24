// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'
import './swiper.css';

import bgImg1 from '../../assets/images/carousel1.jpg'
import bgImg2 from '../../assets/images/carousel2.jpg'
import bgImg3 from '../../assets/images/carousel3.jpg'
const Carousel = () => {
    return (
        <div className='container mx-auto px-4 md:px-5 py-3 md:py-5 lg:py-7 xl:py-10'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
            >
                <SwiperSlide>
                    <Slide
                        image={bgImg1}
                        text='Get Your Web Development Projects Done in minutes'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgImg2}
                        text='Get Your Graphics Design Projects Done in minutes'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgImg3}
                        text='Start Your Digital Marketing Campaigns up running'
                    />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Carousel;